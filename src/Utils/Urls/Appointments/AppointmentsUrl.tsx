import { BASE_URL } from "../../Network/Network";

export const GET_ALL_APPOINTMENT = `${BASE_URL}/appointments/create`;

export const GET_APPOINTMENT_BY_USER_ID = (userId: any, userType: any) => `${BASE_URL}/appointments/user/${userId}/${userType}`;

export const GET_APPOINTMENT_BY_ID = (id: any) => `${BASE_URL}/appointments/${id}`;

export const UPDATE_APPOINTMENT_BY_ID = (id: any) => `${BASE_URL}/appointments/${id}`;

export const DELETE_APPOINTMENT_BY_ID = (id: any) => `${BASE_URL}/appointments/${id}`;


