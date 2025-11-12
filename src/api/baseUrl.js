import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://api.e-monline.online/",
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request interceptor
baseUrl.interceptors.request.use(
  (config) => {
    // يمكن إضافة token هنا إذا لزم الأمر
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
baseUrl.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // تحسين معالجة الأخطاء
    if (error.code === "ECONNABORTED") {
      error.message = "انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى";
    } else if (error.code === "ERR_NETWORK") {
      error.message = "خطأ في الاتصال بالشبكة. يرجى التحقق من اتصالك بالإنترنت";
    } else if (error.code === "ERR_INTERNET_DISCONNECTED") {
      error.message = "لا يوجد اتصال بالإنترنت";
    }
    
    return Promise.reject(error);
  }
);

export default baseUrl;
