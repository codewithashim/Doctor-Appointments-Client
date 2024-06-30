import React from 'react';

const DoctorHero = () => {
    return (
        <header>
            <div className="min-h-[60vh] z-10 md:relative overflow-hidden flex w-full items-center bg-gray-50">
                {/* Image Section */}
                <div className="transform -skew-x-[10deg] overflow-hidden w-1/2 -right-12 rounded-bl-[12px] absolute top-0 h-full hidden md:block">
                    <div className="transform skew-x-[10deg] absolute top-20 -right-2 h-full z-1 w-full bg-cover bg-no-repeat scale-[1.3] bg-center bg-doctor-hero-section"></div>
                </div>

                {/* Left Content Section */}
                <div className="md:z-1 md:w-1/2 flex justify-center mt-20">
                    <div className="flex flex-wrap mx-3 justify-center">
                        <div className="w-full pl-10 flex gap-5 flex-col md:w-8/12">
                            <h1 className="md:relative md:z-10 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500 text-5xl font-bold">
                                Schedule Your Consultation Today
                            </h1>
                            <h2 className="text-gray-700 text-5xl font-bold">
                                Expert Care for Your Health Needs
                            </h2>
                            <p className="text-gray-500 font-normal text-xl">
                                {"Welcome to our doctor's office. Book an appointment with one of our skilled physicians and get the professional care you deserve. Your health is our priority!"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DoctorHero;
