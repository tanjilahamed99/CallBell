import axios from "axios";
import { BASE_URL } from "../config/constant";

export const createRazorpayPaymentIntent = (data) => {
  return axios.post(`${BASE_URL}/rozarpay/create-intent`, data);
};

export const verifyRazorpayPayment = (data) => {
  return axios.post(`${BASE_URL}/rozarpay/validate-payment`, data);
};

export const getRazorpayKey = () => {
  return axios.get(`${BASE_URL}/rozarpay/key`);
};
