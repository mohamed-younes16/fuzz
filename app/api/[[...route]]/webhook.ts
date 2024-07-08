import { Hono } from "hono";
const crypto = require("crypto");
import { Buffer } from "buffer";
import { Subscription, WebhookPayload } from "lemonsqueezy-webhooks";
import prismadb from "@/lib/prismabd";
import { lemonClient } from "@/lib/lemons";
export const webhook = new Hono().post("/", async (c) => {
  try {
    const secret = process.env.LEMONS_SQUEEZY_SIGNATURE as string;
    const productId = process.env.LEMONS_SQUEEZY_PRODUCT_ID as string;
    // Get the raw body text
    const bodyText = await c.req.text();
    const bodyBuffer = Buffer.from(bodyText);
    // Parse the payload
    const payload: WebhookPayload & {
      data: {
        attributes: {
          customer_id: number;
        };
      };
    } = JSON.parse(bodyText);

    // Get the signature from the headers
    const sigString = c.req.raw.headers.get("x-signature") || "";
    const signature = Buffer.from(sigString, "utf8");

    // Create HMAC and compute the digest
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(bodyBuffer).digest("hex"), "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return c.json({ message: "Invalid signature" }, 403);
    }

    const userId: string = payload.meta.custom_data.userId;
    switch (payload.meta.event_name) {
      case "subscription_created": {
        const subscription = await lemonClient.retrieveSubscription({
          id: payload.data.id,
        });

        await prismadb.user.update({
          where: { id: userId },
          data: {
            subscriptionId: `${subscription.data.id}`,
            customerId: `${payload.data.attributes.customer_id}`,
            variantId: subscription.data.attributes.variant_id,
            currentPeriodEnd: subscription.data.attributes.renews_at,
          },
        });
      }

      case "subscription_updated": {
        const subscription = await lemonClient.retrieveSubscription({
          id: payload.data.id,
        });

        const user = await prismadb.user.findUnique({
          where: { subscriptionId: `${subscription.data.id}`, id: userId },
          select: { subscriptionId: true },
        });

        if (!user || !user.subscriptionId) return;

        await prismadb.user.update({
          where: { subscriptionId: user.subscriptionId, id: userId },
          data: {
            variantId: subscription.data.attributes.variant_id,
            currentPeriodEnd: subscription.data.attributes.renews_at,
          },
        });
      }
    }

    return c.json({ message: "Webhook received and verified" }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: "error in server" }, 500);
  }
});

export default webhook;
