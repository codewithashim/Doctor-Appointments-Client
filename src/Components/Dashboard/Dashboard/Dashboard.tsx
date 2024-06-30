// import React, { useState } from 'react';
// import { Table, Modal, Form, Input, DatePicker, Select, Button, Space } from 'antd';
// import { ColumnsType } from 'antd/es/table';
// import { DeleteOutlined } from '@ant-design/icons';
// import useAppointment from '@/Hooks/useAppointment';
// import moment from 'moment';
// import { IAppointment } from '@/Type/CommonType';
// import dynamic from 'next/dynamic';
// const DynamicAppointmentModal = dynamic(() => import('@/Components/Global/Modal/AppointmentModal'), {
//   ssr: false
// });

// const { Option } = Select;

// const Dashboard: React.FC = () => {
//   const { appointmentData, deleteAppointment, updateAppointment } = useAppointment();
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//   const [currentAppointment, setCurrentAppointment] = useState<IAppointment | null>(null);

//   const showModal = (appointment: IAppointment) => {
//     setCurrentAppointment(appointment);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleDelete = (appointmentId: string) => {
//     Modal.confirm({
//       title: 'Delete Appointment',
//       content: 'Are you sure you want to delete this appointment?',
//       okText: 'Delete',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         try {
//           await deleteAppointment(appointmentId);
//         } catch (error) {
//           console.error('Failed to delete appointment:', error);
//         }
//       },
//     });
//   };

//   const columns: ColumnsType<IAppointment> = [
//     {
//       title: 'Patient Name',
//       dataIndex: ['patient', 'name'],
//       key: 'patientName',
//     },
//     {
//       title: 'Doctor Name',
//       dataIndex: ['doctor', 'name'],
//       key: 'doctorName',
//     },
//     {
//       title: 'Appointment Date & Time',
//       dataIndex: 'appointment_date_time',
//       key: 'appointmentDateTime',
//       render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm'),
//     },
//     {
//       title: 'Time Slot',
//       dataIndex: 'time_slot',
//       key: 'timeSlot',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <Space>
//           <Button type="primary" onClick={() => showModal(record)}>Edit</Button>
//           <Button type="primary" danger onClick={() => handleDelete(record._id)} icon={<DeleteOutlined />}>
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <section>
//       <Table dataSource={appointmentData} columns={columns} rowKey="_id" />

//       <DynamicAppointmentModal
//         visible={isModalVisible}
//         appointment={currentAppointment}
//         onCancel={handleCancel}
//         onUpdate={updateAppointment}
//       />
//     </section>
//   );
// };

// export default Dashboard;



import React, { useState } from 'react';
import { Table, Modal, Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import useAppointment from '@/Hooks/useAppointment';
import moment from 'moment';
import { IAppointment } from '@/Type/CommonType';
import dynamic from 'next/dynamic';
const DynamicAppointmentModal = dynamic(() => import('@/Components/Global/Modal/AppointmentModal'), {
  ssr: false
});

const Dashboard: React.FC = () => {
  const { appointmentData, deleteAppointment, updateAppointment } = useAppointment();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentAppointment, setCurrentAppointment] = useState<IAppointment | null>(null);

  const showModal = (appointment: IAppointment) => {
    setCurrentAppointment(appointment);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (appointmentId: string) => {
    Modal.confirm({
      title: 'Delete Appointment',
      content: 'Are you sure you want to delete this appointment?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteAppointment(appointmentId);
        } catch (error) {
          console.error('Failed to delete appointment:', error);
        }
      },
    });
  };

  const columns: ColumnsType<IAppointment> = [
    {
      title: 'Patient Name',
      dataIndex: ['patient', 'name'],
      key: 'patientName',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Doctor Name',
      dataIndex: ['doctor', 'name'],
      key: 'doctorName',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Appointment Date & Time',
      dataIndex: 'appointment_date_time',
      key: 'appointmentDateTime',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm'),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Time Slot',
      dataIndex: 'time_slot',
      key: 'timeSlot',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record)}>Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record._id)} icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  ];

  return (
    <section>
      <Table
        dataSource={appointmentData}
        columns={columns}
        rowKey="_id"
        scroll={{ x: true }}
        // pagination={false}
      />

      <DynamicAppointmentModal
        visible={isModalVisible}
        appointment={currentAppointment}
        onCancel={handleCancel}
        onUpdate={updateAppointment}
      />
    </section>
  );
};

export default Dashboard;
