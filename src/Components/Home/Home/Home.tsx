import React from 'react';
import Hero from '../Hero/Hero';
import InfoSection from '../InfoSection/InfoSection';
import ServicesSection from '../Services/ServicesSection';
import Treatment from '../Treatment/Treatment';
import MakeApointment from '../MakeApointment/MakeApointment';
import Testimonials from '../Testimonials/Testimonials';
import Contact from '@/Components/Global/Contact/Contact';

const Home = () => {
    return (
        <section>
          <Hero/>
          <InfoSection/>
          <ServicesSection/>
          <Treatment/>
          <MakeApointment/>
          <Testimonials/>
          <Contact/>
        </section>
    );
};

export default Home;