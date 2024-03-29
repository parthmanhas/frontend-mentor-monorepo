'use client';

import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";

export default function DropDown({ className, heading, options }: { className?: string, heading: string, options: string[] }) {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(3);

    return <div className={`${className} relative outline-royal-blue-500 rounded-lg`}>
        {/* <p onClick={() => setOpen(!open)} className="font-light text-sm sm:text-md flex hover:cursor-pointer">Sort By: <span className="font-semibold flex items-center ml-3">{items.find((item, index) => index === selected)} {open ? <FaChevronUp className="ml-3" /> : <FaChevronDown className="ml-3" />}</span></p> */}
        <p onClick={() => setOpen(!open)} className="font-normal text-sm sm:text-md flex justify-between hover:cursor-pointer p-3 bg-zircon-50 w-full">{heading} <span className="font-semibold flex items-center ml-3">{options.find((item, index) => index === selected)} {open ? <FaChevronUp className="ml-3" color="blue" /> : <FaChevronDown className="ml-3" color="blue" />}</span></p>
        {open && <div className="absolute bg-white shadow-md rounded-md w-full mt-3 text-waikawa-gray-700 font-light">
            {options.map((item, index) => (
                <p key={index} onClick={() => setSelected(index)} className={`p-2 pl-3 hover:cursor-pointer hover:text-electric-violet-500 flex justify-between items-center ${options.length - 1 !== index && 'border-b-[1px]'}`}>{item} {selected === index && <FiCheck color="purple" />}</p>
            ))}
        </div>}
    </div>
}