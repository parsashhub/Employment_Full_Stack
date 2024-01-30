import axios from "axios";
import { toast } from "react-toastify";

export const apiCaller = async (fu: any) => {
  try {
    return await fu();
  } catch (error) {
    toast.error(error.response.data.message[0] ?? error.message);
  }
};

function convertToEnglishNumbers(input: string) {
  const persianToEnglishMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  // Replace each Persian/Arabic digit with its English equivalent
  return input.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
}

function recursivelyConvertNumbers(obj) {
  if (typeof obj === "string") {
    return convertToEnglishNumbers(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(recursivelyConvertNumbers);
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      obj[key] = recursivelyConvertNumbers(obj[key]);
    }
  }

  return obj;
}

export const initInterceptors = (
  showLoader: () => void,
  hideLoader: () => void,
) => {
  axios.interceptors.request.use(
    (req) => {
      // convert all persian numbers to english
      // if (config.data) {
      //   if (typeof config.data === 'string') {
      //     config.data = convertToEnglishNumbers(config.data);
      //   } else if (typeof config.data === 'object') {
      //     // You may need to customize this based on your request data structure
      //     config.data = recursivelyConvertNumbers(config.data);
      //   }
      // }

      showLoader();
      return req;
    },
    (err) => {
      return Promise.reject(err);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    (err) => {
      hideLoader();
      return Promise.reject(err);
    },
  );
};
