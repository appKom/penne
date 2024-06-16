import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 w-full border border-gray-700 relative text-white rounded-lg bg-[#1c202d]">
      <div
        className="flex items-center justify-between p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-2xl font-medium">{title}</div>
        <span className="flex items-center">{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
      </div>
      <div className={`flex flex-row flex-wrap transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden`}>
        {content.map((element, index) => (
          <div key={index} className="w-1/2 p-2.5">{element}</div>
        ))}
      </div>
    </div>
  );
}
