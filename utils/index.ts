import { format, parse, subDays } from "date-fns";

export function toMilliunits(amount) {
  return amount * 1000;
}

// Function to convert from milliunits to units
export function formatMilliunits(milliunits) {
  return milliunits / 1000;
}
export const formatedPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
export const formatedPercentage = (
  price: number,
  options: {
    addPrefix?: boolean;
  } = {
    addPrefix: false,
  }
) => {
  const res = new Intl.NumberFormat("en-US", {
    style: "percent",
    currency: "USD",
  }).format(price / 100);
  return options.addPrefix && price > 0 ? `+${res}` : res;
};

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}
export const calculatePercentage = (prev: number, curr: number) => {
  if (prev == 0) return prev === curr ? 0 : 100;
  return ((curr - prev) / prev) * 100;
};
type Period = {
  from: Date | string | undefined;
  to: Date | string | undefined;
};
export const formatDateRange = ({ from, to }: Period) => {
  const defTo = new Date();
  const defFrom = subDays(new Date(), 30);

  const start = from ? from : defFrom;
  const end = to ? to : defTo;
  return `${format(start, "LLL dd , y")} - ${format(end, "LLL dd , y")}`;
};
