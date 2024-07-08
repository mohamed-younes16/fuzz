import { LemonsqueezyClient } from "lemonsqueezy.ts";

export const lemonClient = new LemonsqueezyClient(process.env.LEMONSQUEEZY_API_KEY as string);