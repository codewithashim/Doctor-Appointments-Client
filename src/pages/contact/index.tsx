'use client'
import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Contact from '@/Components/Global/Contact/Contact';

const ContactPage = () => {
    return (
        <RootLayout>
            <section className="h-[70vh]">
            <Contact/>
            </section>
        </RootLayout>
    );
};

export default ContactPage;