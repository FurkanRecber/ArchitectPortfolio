// Backend'den gelen veri yapısı (ProjectDto ile birebir uyumlu)
export interface Project {
  id: number;
  title: string;
  slug: string;

  description: string; // Kısa açıklama (Listelerde görünür)
  details: string;     // Uzun detay (Detay sayfasında görünür)

  coverImageUrl: string;    // Kapak resmi
  category: string;    // Kategori ismi (örn: Residential)

  year: string;
  location: string;
  client: string;
  area: string;
  status: string;
  team: string;

  gallery: string[];   // Normal resim URL listesi
  plans: string[];     // Mimari plan URL listesi

  // Yeni Eklenen Alanlar (Dashboard Tablosu İçin)
  createdDate?: string;
  isPublished?: boolean;

  // Frontend UI için gerekli olabilecek opsiyonel alanlar (Grid yapısı vs.)
  className?: string;
}

// İstatistikler için (değişmedi)
export interface Stat {
  id: number;
  label: string;
  value: string;
}

export interface Category {
  id: number;
  name: string;
  // Yeni eklenenler:
  description?: string;
  iconId?: number;
  coverImageUrl?: string;
  projectCount?: number;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LoginRequest {
  username: string;  // Backend'de Username veya Email kullanıyor olabilirsin, LoginDto'ya bakmak lazım. Genelde Email tercih edilir.
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  expiration: string;
  refreshToken: string;
}

export interface SiteSetting {
  id: number;

  // İngilizce
  heroTitle: string;
  aboutTitle: string;
  aboutText: string;
  address: string;

  // Türkçe
  heroTitleTr: string;
  aboutTitleTr: string;
  aboutTextTr: string;
  addressTr: string;

  // İletişim & Sosyal
  email: string;
  phone: string;
  googleMapEmbedCode: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
}