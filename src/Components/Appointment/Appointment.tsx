/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Button, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import useDoctor from '@/Hooks/useDoctor';
import usePatient from '@/Hooks/usePatient';
import { Option } from 'antd/lib/mentions';
import AppointmentHero from './AppointmentHero/AppointmentHero';
import { Moment } from 'moment';
import { useAppSelector } from "@/Store";
import { useRouter } from 'next/router';
import { CREATE_APPOINTMENT } from '@/Utils/Urls/Appointments/AppointmentsUrl';
import { openNotificationWithIcon } from '../Global/Message/Message';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
}

interface TimeSlot {
  value: string;
  label: string;
}

const Appointment: React.FC = () => {
  const { id, authtoken } = useAppSelector((store) => store.auth);
  const isLogin = useAppSelector((state) => state.auth.authState);
  const { getAllDoctor } = useDoctor();
  const { getPatientByUserId } = usePatient()
  const [form] = Form.useForm();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const router = useRouter();
  const [patientData, setPatientData] = useState<any>(null);
  const fetchPatientData = async () => {
    try {
      const patient = await getPatientByUserId(id!, authtoken);
      setPatientData(patient);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      router.push('/auth/login');
    } else {
      fetchPatientData()
    }
  }, [isLogin, router]);
 
  const mockTimeSlots: TimeSlot[] = [
    { value: '09:00', label: '09:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '16:00', label: '04:00 PM' },
  ];

  const handleSubmit = async (values: any) => {
    try {
      const isoDateTime = values.appointment_date_time.toISOString();
      values.appointment_date_time = isoDateTime;
      const headers = {
        authorization: authtoken,
        'Content-Type': 'application/json',
      };
      const bookingData = {
        patient_id: patientData?.id,
        doctor_id: values?.doctor_id,
        appointment_date_time: values.appointment_date_time,
        time_slot: values.time_slot
      }
      const response = await axios.post(CREATE_APPOINTMENT, bookingData, { headers });

      if (response?.status === 200 || response?.data) {
        openNotificationWithIcon(
          'success',
          'Booking Successful',
          'Successfully your appointment is booked.',
        );
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
    <section>
      <AppointmentHero />
      <div className="bg-fixed h-[60vh] p-6 makeAppointment flex flex-col justify-center items-center">
        <h1 className="md:relative md:z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-5xl font-bold">
          Book Your Appointment
        </h1>
        <div className="container">
          <Form
            form={form}
            onFinish={handleSubmit}
            className="lg:max-w-[35vw] lg:h-[40vh] mx-auto mt-8 p-8 bg-white rounded shadow-lg flex-1"
          >
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

            <Form.Item
              name="doctor_id"
              rules={[{ required: true, message: 'Please select a doctor' }]}
              className="mb-4"
            >
              <Select placeholder="Select a doctor" className="w-full h-[2rem]">
                {getAllDoctor &&
                  getAllDoctor.map((doctor: Doctor) => (
                    <Option key={doctor._id} value={doctor._id}>
                      {doctor?.name} - {doctor?.specialty}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="appointment_date_time"
              rules={[
                { required: true, message: 'Please select a date and time' },
              ]}
              className="mb-4"
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                onChange={handleDateChange}
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              name="time_slot"
              rules={[{ required: true, message: 'Please select a time slot' }]}
              className="mb-4"
            >
              <Select placeholder="Select a time slot" className="w-full">
                {timeSlots.map((slot: TimeSlot) => (
                  <Option key={slot.value} value={slot.value}>
                    {slot.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="mt-8">
              <Button type="primary" htmlType="submit" className="w-full">
                Book Appointment
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
