import { BASE_URL } from "../../Network/Network";

export const GET_ALL_DOCTOR = `${BASE_URL}/doctor/get`;

export const GET_DOCTOR_BY_USER_ID = (userId: any) => `${BASE_URL}/doctor/user/${userId}`;

export const GET_DOCTOR_BY_ID = (id: any) => `${BASE_URL}/doctor/${id}`;

export const UPDATE_DOCTOR_BY_ID = (id: any) => `${BASE_URL}/doctor/${id}`;

export const DELETE_DOCTOR_BY_ID = (id: any) => `${BASE_URL}/doctor/${id}`;

