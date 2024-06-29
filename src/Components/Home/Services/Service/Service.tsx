import React from "react";
import Image from "next/image";

interface ServiceProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: any;
  };
}

const Service: React.FC<ServiceProps> = ({ service }) => {
  const { title, description, icon } = service;
  return (
    <div className="card rounded-lg m-4 p-10 bg-base-100 shadow-xl">
      <figure className="relative w-full h-32">
        <Image src={icon} alt={title} layout="fill" objectFit="contain" />
      </figure>
      <div className="flex mt-2 flex-col gap-2">
        <h2 className="font-bold text-[1.5rem]">{title}</h2>
        <p className="text-[1rem]">{description.slice(0, 100)}</p>
      </div>
    </div>
  );
};

export default Service;
