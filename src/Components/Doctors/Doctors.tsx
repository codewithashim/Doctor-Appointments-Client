import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal, Form, Select, DatePicker, message } from 'antd';
import Image from 'next/image';
import { Moment } from 'moment';
import { Option } from 'antd/lib/mentions';
import { useAppSelector } from "@/Store";
import { useRouter } from 'next/router';
import { CREATE_APPOINTMENT } from '@/Utils/Urls/Appointments/AppointmentsUrl';
import { openNotificationWithIcon } from '../Global/Message/Message';
import { mockTimeSlots } from '@/Utils/Mock/CommonData';
import { TimeSlot } from '@/Type/CommonType';
import axios from 'axios';
import useDoctor from '@/Hooks/useDoctor';
import usePatient from '@/Hooks/usePatient';
import DoctorHero from './DoctorHero/DoctorHero';

const { Meta } = Card;
const { RangePicker } = DatePicker;

const Doctors: React.FC = () => {
    const { getAllDoctor } = useDoctor();
    const { patientId } = usePatient();
    const { id, authtoken } = useAppSelector((store) => store.auth);
    const router = useRouter();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
    const [form] = Form.useForm();
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

    const handleBookNow = (doctorId: string) => {
        setSelectedDoctorId(doctorId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = async (values: any) => {
        try {
            const isoDateTime = values.appointment_date_time.toISOString();
            const headers = {
                authorization: authtoken,
                'Content-Type': 'application/json',
            };
            const bookingData = {
                patient_id: patientId,
                doctor_id: selectedDoctorId,
                appointment_date_time: isoDateTime,
                time_slot: values.time_slot
            };
            const response = await axios.post(CREATE_APPOINTMENT, bookingData, { headers });

            if (response?.status === 200 || response?.data) {
                openNotificationWithIcon(
                    'success',
                    'Booking Successful',
                    'Your appointment has been successfully booked.'
                );
                setIsModalVisible(false);
                form.resetFields();
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Error booking appointment');
            form.resetFields();
        }
    };

    const handleDateChange = (date: Moment | null) => {
        if (date) {
            setTimeSlots(mockTimeSlots);
        }
    };

    return (
    <>
        <DoctorHero/>
        <section className='container mx-auto px-4 py-8'>
            <h2 className='text-3xl font-bold mb-6 text-center'>Our Doctors</h2>
            <Row gutter={[16, 16]}>
                {getAllDoctor?.map((doctor: any) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} key={doctor._id}>
                        <Card
                            hoverable
                            className='h-full flex flex-col'
                            cover={
                                <div className='h-48 relative overflow-hidden'>
                                    <Image
                                        src={doctor.profile}
                                        alt={doctor.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            }
                        >
                            <Meta
                                title={<h3 className='text-lg font-semibold'>{doctor.name}</h3>}
                                description={
                                    <div>
                                        <p className='text-sm text-gray-500 mt-2'>{doctor.email}</p>
                                        <p className='text-gray-600'>{doctor.specialty}</p>
                                    </div>
                                }
                            />
                            <Button
                                type="primary"
                                className='mt-4 w-full bg-blue-500 hover:bg-blue-600'
                                onClick={() => handleBookNow(doctor._id)}
                            >
                                Book Now
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Appointment Booking Modal */}
            <Modal
                title={`Book Appointment with Dr. ${getAllDoctor?.find((d: any) => d._id === selectedDoctorId)?.name}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key='cancel' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key='book' type='primary' onClick={() => form.submit()}>
                        Book Appointment
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    initialValues={{ doctor_id: selectedDoctorId }}
                >
            
                    <Form.Item
                        name="appointment_date_time"
                        label="Appointment Date and Time"
                        rules={[{ required: true, message: 'Please select a date and time' }]}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" onChange={handleDateChange} />
                    </Form.Item>
                    <Form.Item
                        name="time_slot"
                        label="Time Slot"
                        rules={[{ required: true, message: 'Please select a time slot' }]}
                    >
                        <Select placeholder="Select a time slot">
                            {timeSlots.map((slot: TimeSlot) => (
                                <Option key={slot.value} value={slot.value}>
                                    {slot.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    </>
    );
};

export default Doctors;
