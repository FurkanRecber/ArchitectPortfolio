import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7179/api',
});

// Request Interceptor: Token ekle
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Hata Yönetimi
api.interceptors.response.use(
    (response) => response,
    (error) => {
        let errorMessage = "Bir hata oluştu.";

        if (error.response) {
            // 400 Bad Request (Validation Errors)
            if (error.response.status === 400) {
                if (error.response.data.errors) {
                    // FluentValidation veya ASP.NET default validasyon hataları
                    const errors = error.response.data.errors;
                    const messages = Object.values(errors).flat();
                    errorMessage = messages.join("\n");
                } else if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else {
                    errorMessage = "Geçersiz istek. Lütfen alanları kontrol ediniz.";
                }
            }
            // 401 Unauthorized
            else if (error.response.status === 401) {
                errorMessage = "Oturum süreniz doldu. Lütfen tekrar giriş yapın.";
                // İsteğe bağlı: Otomatik logout veya redirect
                // localStorage.removeItem('token');
                // window.location.href = '/admin/login'; 
            }
            // 500 Server Error
            else if (error.response.status === 500) {
                errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.";
            }
        } else if (error.request) {
            errorMessage = "Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.";
        }

        // Error object'ine okunabilir mesajı ekle/değiştir
        error.message = errorMessage;

        // Hata fırlatmaya devam et, böylece bileşen 'catch' bloğunda bunu yakalayabilir
        return Promise.reject(error);
    }
);

export default api;
