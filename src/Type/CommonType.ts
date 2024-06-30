export interface IDoctor {
    _id: string;
    name: string;
    profile: string;
    email: string;
    specialty: string;
  }
  
  export interface IPatient {
    _id: string;
    name: string;
    email: string;
    phone: string;
    profile: string;
  }
  
  export interface IAppointment {
    _id: string;
    appointment_date_time: string;
    createdAt: string;
    doctor: IDoctor;
    doctor_id: string;
    patient: IPatient;
    patient_id: string;
    time_slot: string;
    updatedAt: string;
    __v: number;
  }
  

 export interface TimeSlot {
    value: string;
    label: string;
  }