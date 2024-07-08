import getCurrentUser from "@/actions";
import { lemonClient } from "./lemons";
import prismadb from "./prismabd";

export async function getUserSubscriptionPlan() {
  const userData = await getCurrentUser();
  const user = await prismadb.user.findFirst({
    where: { id: userData?.id },
    select: {
      subscriptionId: true,
      currentPeriodEnd: true,
      customerId: true,
      variantId: true,
    },
  });

  if (!user) throw new Error("User not found");

  const isPro = !!(
    user.variantId &&
    user.currentPeriodEnd &&
    user.currentPeriodEnd.getTime() + 86_400_000 > Date.now()
  );

  const subscription = user.subscriptionId
    ? await lemonClient.retrieveSubscription({
        id: user.subscriptionId,
      })
    : null;

  let isCanceled = false;

  if (isPro && user.subscriptionId && !!subscription && !!subscription.data) {
    isCanceled = subscription.data.attributes.cancelled;
  }

  return {
    ...user,
    currentPeriodEnd: user.currentPeriodEnd?.toISOString(),
    isCanceled,
    isPro,
    updatePaymentMethodURL: subscription
      ? subscription.data.attributes.urls.update_payment_method
      : null,
  };
}
