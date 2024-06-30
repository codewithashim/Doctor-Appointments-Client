import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';
import { IAppointment } from '@/Type/CommonType';
import { message } from 'antd';
import { mockTimeSlots } from '@/Utils/Mock/CommonData';
const { Option } = Select;

interface AppointmentModalProps {
  visible: boolean;
  appointment: IAppointment | null;
  onCancel: () => void;
  onUpdate: (id: string, data: any) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  visible,
  appointment,
  onCancel,
  onUpdate,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (appointment) {
      form.setFieldsValue({
        patientName: appointment.patient.name,
        doctorName: appointment.doctor.name,
        appointmentDateTime: moment(appointment.appointment_date_time),
        timeSlot: appointment.time_slot,
      });
    }
  }, [appointment, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { appointmentDateTime, timeSlot } = values;
      const updatedData = {
        appointment_date_time: appointmentDateTime.toISOString(),
        time_slot: timeSlot,
      };
      if (appointment) {
        onUpdate(appointment._id, updatedData);
        onCancel();
        message.success('Appointment updated successfully');
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Edit Appointment"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleOk}>
          Update
        </Button>,
      ]}
    >
      {appointment && (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            patientName: appointment.patient.name,
            doctorName: appointment.doctor.name,
            appointmentDateTime: moment(appointment.appointment_date_time),
            timeSlot: appointment.time_slot,
          }}
        >
          <Form.Item label="Patient Name" name="patientName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Doctor Name" name="doctorName">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Appointment Date & Time"
            name="appointmentDateTime"
            rules={[{ required: true, message: 'Please select date and time' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="Time Slot" name="timeSlot">
            <Select>
              {mockTimeSlots.map(slot => (
                <Option key={slot.value} value={slot.value}>
                  {slot.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default AppointmentModal;
