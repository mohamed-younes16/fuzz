import { Hono } from "hono";
import { lemonClient } from "@/lib/lemons";
import axios from "axios";
import getCurrentUser from "@/actions";
import type { CreateCheckoutResult } from "lemonsqueezy.ts/dist/types";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export type CreateCheckoutResponse = {
  checkoutURL: string;
};
export const purchase = new Hono()
  .post("/", async (c) => {
    try {
      // const response = await lemonSqueezyApiInstance.post("/checkouts", {
      //   data: {
      //     type: "checkouts",
      //     attributes: {
      //       checkout_data: {
      //         custom: {
      //           user_id: "123",
      //         },
      //       },
      //     },
      //     relationships: {
      //       store: {
      //         data: {
      //           type: "stores",
      //           id: process.env.LEMON_STORE_ID!.toString(),
      //         },
      //       },
      //       variant: {
      //         data: {
      //           type: "variants",
      //           id: "301054",
      //         },
      //       },
      //     },
      //   },
      // });

      // const checkoutUrl = response.data.data.attributes.url;

      // console.log(response.data);
      // console.log(response.data.data.attributes, "_______________________");
      const user = (await getCurrentUser())!;
      const variant = (
        await lemonClient.listAllVariants({
          productId: process.env.LEMONS_SQUEEZY_PRODUCT_ID,
        })
      ).data[0];

      const checkout = (
        await axios.post(
          "https://api.lemonsqueezy.com/v1/checkouts",
          {
            data: {
              type: "checkouts",
              attributes: {
                checkout_data: {
                  email: user.email,
                  custom: { userId: user.id, email: user.email },
                },
              },
              relationships: {
                store: {
                  data: {
                    type: "stores",
                    id: process.env.LEMON_SQUEEZY_STORE_ID,
                  },
                },
                variant: { data: { type: "variants", id: variant.id } },
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
            },
          }
        )
      ).data as CreateCheckoutResult;
      const { url, checkout_data } = checkout.data.attributes;
      console.log(checkout_data);
      return c.json({ checkoutUrl: url }, 201);
    } catch (error) {
      console.log(error);
      return c.json({ message: "error in server" }, 500);
    }
  })
  .get("/", async (c) => {
    const user = await getCurrentUser();
    const planData = await getUserSubscriptionPlan();
    return c.json({ planData }, { status: 200 });
  });

export default purchase;
