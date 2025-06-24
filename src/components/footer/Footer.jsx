import React from "react";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="py-5 mt-3 bg-amber-50 flex justify-between items-center gap-2 md:gap-10 absolute right-0 left-0 px-[4%] md:px-[10%] text-sm">
      <p>© 2023. Все права занижены.</p>
      <p className="flex gap-3">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <AiFillInstagram className="text-2xl text-gray-800" />
        </a>
      </p>
    </div>
  );
};

export default Footer;
