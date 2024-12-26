import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ list }) => {
  return (
    <div className="text-white flex flex-col space-y-1">
      {list.map((item, index) => (
        <Link to={item.link} key={index}>
          <div
            key={index}
            className="flex items-center space-x-4 p-3 hover:bg-white/10 rounded-lg cursor-pointer"
          >
            {item.content === "Profile" ? (
              <item.icon className="w-[24px] h-[24px]" />
            ) : (
              <item.icon />
            )}
            <p className="font-semibold text-md">{item.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
