import { toast } from "react-toastify";
import { toastOptions } from "../models/toastOpt";

export const showToastSuccess = (message) => {
	toast.success(message, toastOptions);
};

export const showToastWarn = (message) => {
	toast.warn(message, toastOptions);
};

export const showToastError = (message) => {
	toast.error(message, toastOptions);
};
