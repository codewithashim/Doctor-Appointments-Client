import { GET_PATIENT_BY_USER_ID } from "@/Utils/Urls/Patients/PatientsUrl";
import axios from "axios";

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
  return {
    getPatientByUserId,
  };
};

export default usePatient;
