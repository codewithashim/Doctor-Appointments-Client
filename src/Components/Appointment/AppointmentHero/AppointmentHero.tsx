import React from 'react';

const AppointmentHero = () => {
    return (
        <header>
            <div className="min-h-[60vh] z-10 md:relative overflow-hidden flex w-full items-center bg-gray-50">
                {/* Image Section */}
                <div className="transform -skew-x-[10deg] overflow-hidden w-1/2 -right-12 rounded-bl-[12px] absolute top-0 h-full hidden md:block">
                    <div className="transform skew-x-[10deg] absolute top-20 -right-2 h-full z-1 w-full bg-cover bg-no-repeat scale-[1.3] bg-center bg-appointment-hero-section"></div>
                </div>

                {/* Left Content Section */}
                <div className="md:z-1 md:w-1/2 flex justify-center mt-20">
                    <div className="flex flex-wrap mx-3 justify-center">
                        <div className="w-full pl-10 flex gap-5 flex-col md:w-8/12">
                            <h1 className="md:relative md:z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-5xl font-bold">
                                Book Your Appointment Now
                            </h1>
                            <h2 className="text-gray-700 text-5xl font-bold">
                                Find the Right Healthcare Provider
                            </h2>
                            <p className="text-gray-500 font-normal text-xl">
                                {"It's time to prioritize your health. Book an appointment with our expert healthcare providers today and start feeling better."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentHero;
