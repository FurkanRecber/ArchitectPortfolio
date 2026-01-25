// Backend'den gelen veri yapısı (ProjectDto ile birebir uyumlu)
export interface Project {
  id: number;
  title: string;
  slug: string;

  description: string; // Kısa açıklama (Listelerde görünür)
  details: string;     // Uzun detay (Detay sayfasında görünür)

  // Türkçe Alanlar & Featured
  titleTr?: string;
  descriptionTr?: string;
  detailsTr?: string;
  isFeatured?: boolean;
  categoryId?: number;

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

  // General & Brand
  siteTitle?: string;
  logoUrl?: string; // Logo
  copyrightText?: string;
  copyrightTextTr?: string;
  footerDescription?: string;
  footerDescriptionTr?: string;

  // Hero Section
  heroTitle: string;
  heroTitleTr: string;
  heroSubtitle?: string;
  heroSubtitleTr?: string;
  heroButtonText?: string;
  heroButtonTextTr?: string;
  heroImageUrl?: string;

  // CTA Section
  ctaTitle?: string;
  ctaTitleTr?: string;
  ctaDescription?: string;
  ctaDescriptionTr?: string;
  ctaButtonText?: string;
  ctaButtonTextTr?: string;

  // About & Studio (Updated)
  aboutTitle: string;
  aboutTitleTr: string;
  aboutDescription?: string; // Was aboutText
  aboutDescriptionTr?: string;
  aboutImageUrl?: string;

  // Philosophy
  philosophyTitle?: string;
  philosophyTitleTr?: string;
  philosophyDescription?: string;
  philosophyDescriptionTr?: string;

  // Metrics (Flexible)
  metric1Title?: string;
  metric1TitleTr?: string;
  metric1Value?: string;

  metric2Title?: string;
  metric2TitleTr?: string;
  metric2Value?: string;

  metric3Title?: string;
  metric3TitleTr?: string;
  metric3Value?: string;

  // Showreel
  showreelUrl?: string;

  // Contact & Social
  email: string;
  phone: string;
  address: string;
  addressTr: string;
  googleMapEmbedCode: string;

  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;

  // SEO
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  headScripts?: string;
  metaKeywords?: string;
  metaKeywordsTr?: string;
  robotsTxt?: string;
}