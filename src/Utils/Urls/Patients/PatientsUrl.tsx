import { BASE_URL } from "../../Network/Network";

export const GET_ALL_PATIENT = `${BASE_URL}/patients/get`;

export const GET_PATIENT_BY_USER_ID = (userId: any) => `${BASE_URL}/patients/user/${userId}`;

export const GET_PATIENT_BY_ID = (id: any) => `${BASE_URL}/patients/${id}`;

export const UPDATE_PATIENT_BY_ID = (id: any) => `${BASE_URL}/patients/${id}`;

export const DELETE_PATIENT_BY_ID = (id: any) => `${BASE_URL}/patients/${id}`;

