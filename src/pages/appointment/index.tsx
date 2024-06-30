'use client'
import Preloader from "@/Components/Global/Preloader/Preloader"
import dynamic from 'next/dynamic';
import RootLayout from '@/Layouts/RootLayout';

const DynamicAppointment = dynamic(() => import('@/Components/Appointment/Appointment'), {
    ssr: false,
    loading: () => <div>
    <Preloader/>
</div>,
});

const AppointmentPage = () => {
    return (
        <RootLayout>
            <DynamicAppointment />
        </RootLayout>
    );
};

export default AppointmentPage;
