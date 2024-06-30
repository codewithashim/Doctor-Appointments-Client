import { GET_PATIENT_BY_USER_ID } from "@/Utils/Urls/Patients/PatientsUrl";
import axios from "axios";
import { useEffect,useState } from "react";
import { useAppSelector } from "@/Store";

const getPatientByUserId = async (userId: string, authtoken: any) => {
  try {
    const headers = {
      authorization: authtoken,
      "Content-Type": "application/json",
    };
    const response = await axios.get(GET_PATIENT_BY_USER_ID(userId), {
      headers,
    });
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw new Error("Failed to fetch patient data");
  }
};

const usePatient = () => {
  const { id, authtoken } = useAppSelector((store) => store.auth);
  const isLogin = useAppSelector((state) => state.auth.authState);
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
    if (isLogin) {
      fetchPatientData()
    } 
  }, []);

  const patientId = patientData.id;
  
  
  return {
    getPatientByUserId,
    patientData,
    patientId
  };
};

export default usePatient;
