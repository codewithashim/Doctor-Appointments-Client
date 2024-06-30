'use client'
import RootLayout from '@/Layouts/RootLayout';
import dynamic from 'next/dynamic';

const DynamicAppointment = dynamic(() => import('@/Components/Appointment/Appointment'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const AppointmentPage = () => {
    return (
        <RootLayout>
            <DynamicAppointment />
        </RootLayout>
    );
};

export default AppointmentPage;
