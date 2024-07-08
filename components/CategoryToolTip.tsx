import { formatedPrice } from "@/utils";

const CategoryToolTip = ({ payload, active, color, variant }) => {
  if (!active) return null;

  const name = variant == "radar" ? payload.payload.category : payload.name;
  const value = payload.value;

  return (
    <div className=" bg-background space-y-1 text-sm rounded-lg p-4 shadow-2xl">
      <p className="pl-4  text-sm">{name}</p>
      <div className="flex items-center gap-1">
        {" "}
        <div
          style={{ backgroundColor: color }}
          className="h-3 w-3 rounded-full"
        />{" "}
        <p>expense : {formatedPrice(value * -1)}</p>
      </div>
    </div>
  );
};

export default CategoryToolTip;
