// Dosya: src/utils/imageUrlHelper.ts

const API_BASE_URL = 'https://localhost:7179'; // Backend adresin

export const getImageUrl = (path: string | null | undefined) => {
    if (!path) return 'https://via.placeholder.com/150'; // Resim yoksa yer tutucu

    // Eğer resim zaten tam bir URL ise (http ile başlıyorsa) dokunma
    if (path.startsWith('http')) return path;

    // Değilse başına Backend adresini ekle
    // Path'in başında / olup olmamasını kontrol ederek birleştir
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE_URL}${cleanPath}`;
};