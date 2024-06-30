import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/Store";
import { GET_APPOINTMENT_BY_USER_ID, UPDATE_APPOINTMENT_BY_ID, DELETE_APPOINTMENT_BY_ID } from "@/Utils/Urls/Appointments/AppointmentsUrl"; // Adjust URL as per your project structure
import usePatient from "./usePatient";
import { message } from "antd";

const getAppointmentByUserId = async (
  userId: string,
  authtoken: any,
  userType: any
) => {
  try {
    const headers = {
      authorization: authtoken,
      "Content-Type": "application/json",
    };
    const response = await axios.get(
      GET_APPOINTMENT_BY_USER_ID(userId, userType),
      {
        headers,
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    throw new Error("Failed to fetch appointment data");
  }
};

const deleteAppointmentById = async (
  appointmentId: string,
  authtoken: any
) => {
  try {
    const headers = {
      authorization: authtoken,
      "Content-Type": "application/json",
    };
    const response = await axios.delete(
      DELETE_APPOINTMENT_BY_ID(appointmentId),
      {
        headers,
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw new Error("Failed to delete appointment");
  }
};

const updateAppointmentById = async (
  appointmentId: string,
  appointmentData: any,
  authtoken: any
) => {
  try {
    const headers = {
      authorization: authtoken,
      "Content-Type": "application/json",
    };
    const response = await axios.patch(
      UPDATE_APPOINTMENT_BY_ID(appointmentId),
      appointmentData,
      {
        headers,
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
};

const useAppointment = () => {
  const { patientId } = usePatient();
  const { authtoken, role } = useAppSelector((store) => store.auth);
  const isLogin = useAppSelector((state) => state.auth.authState);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointmentData = async () => {
    setLoading(true);
    setError(null);
    if (!patientId) {
      setError("Patient ID is undefined, cannot fetch appointment data.");
      setLoading(false);
      return;
    }
    if (!authtoken || !role) {
      setError("Authentication token or role is missing, cannot fetch appointment data.");
      setLoading(false);
      return;
    }

    try {
      const appointment = await getAppointmentByUserId(
        patientId,
        authtoken,
        role
      );
      setAppointmentData(appointment);
    } catch (error) {
      setError("Failed to fetch appointment data. Please try again later.");
      console.error("Error fetching appointment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (appointmentId: string) => {
    try {
      setLoading(true);
      await deleteAppointmentById(appointmentId, authtoken);
      message.success("Appointment deleted successfully");
      fetchAppointmentData();
    } catch (error) {
      message.error("Failed to delete appointment. Please try again later.");
      console.error("Failed to delete appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (appointmentId: string, updatedData: any) => {
    try {
      setLoading(true);
      await updateAppointmentById(appointmentId, updatedData, authtoken);
      message.success("Appointment updated successfully");
      fetchAppointmentData();
    } catch (error) {
      message.error("Failed to update appointment. Please try again later.");
      console.error("Failed to update appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin && patientId) {
      fetchAppointmentData();
    }
  }, [isLogin, patientId]);

  return {
    appointmentData,
    loading,
    error,
    deleteAppointment,
    updateAppointment,
  };
};

export default useAppointment;
