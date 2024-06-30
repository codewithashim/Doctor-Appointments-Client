'use client'
import React from "react";
import Link from "next/link";
import { IoMdArrowRoundForward } from "react-icons/io";

interface ButtonProps {
  icon?: React.ReactNode;  
  title: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ icon, title, link, onClick, className, disabled }) => {
  return (
    <>
      {link ? (
        <Link href={link} className={`primary-btn w-auto flex items-center gap-2 ${className}`}>
          {title}
          {icon && <span className="text-[2rem] text-white">{icon}</span>}
        </Link>
      ) : (
        <button disabled={disabled} onClick={onClick} className={`primary-btn w-auto flex items-center gap-2 ${className}`}>
          {title}
          {icon && <span className="text-[2rem] text-white">{icon}</span>}
        </button>
      )}
    </>
  );
};
