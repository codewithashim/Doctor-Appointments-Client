import React from "react";
import Image from "next/image";
import Quites from "../../../assets/icons/quote.svg";
import pepole1 from "../../../assets/images/people1.png";
import pepole2 from "../../../assets/images/people2.png";
import pepole3 from "../../../assets/images/people3.png";
import Testimonial, { TestimonialData } from "./Testimonial/Testimonial";

const testimonialData: TestimonialData[] = [
  {
    id: 1,
    name: "Winson Herry",
    from: "California",
    img: pepole1,
    description:
      "I'm very happy with the service I received from Dr. Smith and his staff. They are very professional and friendly. I would highly recommend them to anyone looking for a dentist.",
  },
  {
    id: 2,
    name: "Jhon Herry",
    from: "California",
    img: pepole2,
    description:
      "I'm very happy with the service I received from Dr. Smith and his staff. They are very professional and friendly. I would highly recommend them to anyone looking for a dentist.",
  },
  {
    id: 3,
    name: "Rebeka Herry",
    from: "California",
    img: pepole3,
    description:
      "So chipe cost and good service , I'm very happy with the service I received from Dr. Smith and his staff. They are very professional and friendly. I would highly recommend them to anyone looking for a dentist.",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-10 container">
      <div className="testimonialTitle flex justify-between p-10">
        <div className="TitleText">
          <h1 className="text-secondary font-bold text-2xl">Testimonial</h1>
          <p className="text-3xl">What Our Patients Say</p>
        </div>
        <Image src={Quites} alt="Testimonial" width={80} height={80} />
      </div>
      <div className="testimonialContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonialData.map((testimonial) => (
          <Testimonial key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
