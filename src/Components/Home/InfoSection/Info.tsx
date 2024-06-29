import React from "react";
import Image from "next/image";

interface InfoProps {
  item: {
    id: number;
    title: string;
    description: string;
    icon: string; 
    background: string;
  };
}

const Info: React.FC<InfoProps> = ({ item }) => {
  const { title, description, icon, background } = item;
  return (
    <div
      className={`card card-side ${background} flex items-center gap-6 rounded-lg m-4 p-8 sm:w-full mx-auto md:w-1/3`}
    >
      <figure className="w-16 h-16 relative">
        <Image src={icon} alt={title} layout="fill" objectFit="contain" />
      </figure>
      <div className="card-body text-white flex flex-col gap-1">
        <h2 className="text-[1.5rem] font-bold">{title}</h2>
        <p className="text-[1.1rem]">{description}</p>
      </div>
    </div>
  );
};

export default Info;