import React from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";

export interface TestimonialData {
  id: number;
  name: string;
  from: string;
  img: any;
  description: string;
}

interface TestimonialProps {
  testimonial: TestimonialData;
}

const Testimonial: React.FC<TestimonialProps> = ({ testimonial }) => {
  const { name, from, img, description } = testimonial;
  return (
    <div className="card bg-base-100 rounded-lg  shadow-xl m-4 p-6">
      <div className="my-3">
        <p className="text-[1.3rem]">{description.slice(0, 100)} ...</p>
      </div>
      <div className="flex gap-4 items-center">
        <div>
          <Image
            src={img}
            alt={name}
            className="rounded-full w-20 h-20"
            style={{
              border: "4px solid #1CC7C1",
            }}
            width={80}
            height={80}
          />
        </div>
        <div>
          <h1 className="font-bold">{name}</h1>
          <p className="flex gap-2 items-center">
            <FaMapMarkerAlt /> {from}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
