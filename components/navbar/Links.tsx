import React from "react";
import NavButton from "./NavButton";

const Links = () => {
  const Links = [
    { name: "Overview", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Accounts", path: "/accounts" },
    { name: "Categories", path: "/categories" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="flexcenter max-lg:flex-col max-lg:items-start  w-full">
      {Links.map(({ name, path }, i) => (
        <NavButton key={i} name={name} path={path} />
      ))}
    </div>
  );
};

export default Links;
