'use client'
import React from 'react';
import Contact from '@/Components/Global/Contact/Contact';
import Preloader from '@/Components/Global/Preloader/Preloader';
import dynamic from 'next/dynamic';

const DynamicRootLayout = dynamic(() => import('@/Layouts/RootLayout'), {
    ssr: false,
    loading: () => <div>
        <Preloader />
    </div>,
});


const ContactPage = () => {
    return (
        <DynamicRootLayout>
            <section className="h-[70vh]">
                <Contact />
            </section>
        </DynamicRootLayout>
    );
};

export default ContactPage;