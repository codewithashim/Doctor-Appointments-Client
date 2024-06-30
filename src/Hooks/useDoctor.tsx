import React from "react";
import { GET_ALL_DOCTOR } from "@/Utils/Urls/Doctor/DoctorUrl";
import { useQuery } from "react-query";

const useDoctor = () => {
  const { data: getAllDoctor, isLoading: allDoctorLoading } = useQuery({
    queryKey: ["getAllDoctor"],
    queryFn: async () => {
      const res = await fetch(GET_ALL_DOCTOR);
      const data = await res.json();
      return data?.data;
    },
  });

  return {
    getAllDoctor,
  };
};

export default useDoctor;
