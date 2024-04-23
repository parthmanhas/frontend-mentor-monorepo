import clsx from 'clsx';
import Link from 'next/link';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';


export default function Button({ onClick, className = "", type, children, variant = 'purple', useDefaultClasses = true }: { onClick?: any, type: "submit" | "reset" | "button" | undefined, className?: string, children?: ReactNode, variant?: 'purple' | 'blue' | 'red' | 'none' | 'east-bay' | 'rhino', useDefaultClasses?: boolean }) {
    return <button type={type} onClick={onClick} className={clsx({
        "flex items-center rounded-md p-2 sm:p-3 hover:cursor-pointer": useDefaultClasses,
        "bg-electric-violet-600 hover:bg-electric-violet-400": variant === 'purple',
        "bg-royal-blue-600 hover:bg-royal-blue-400": variant === 'blue',
        "bg-alizarin-crimson-600 hover:bg-alizarin-crimson-400": variant === 'red',
        "bg-east-bay-900 hover:bg-east-bay-700": variant === 'east-bay',
        "bg-rhino-600 hover:bg-rhino-400": variant === 'rhino',
        "bg-none hover:text-royal-blue-500": variant === 'none',
        [className]: true,
    })}>
        {children ? children : <><FaPlus size={10} />
            <p className="ml-1 sm:ml-3 text-xs md:text-md sm:semibold">Add Feedback</p>
        </>}
    </button>

}