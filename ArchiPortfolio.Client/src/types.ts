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
  nameTr?: string; // Türkçe Kategori Adı
  descriptionTr?: string; // Türkçe Açıklama
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

  // 1. General
  siteTitle: string;
  logoUrl?: string;
  copyrightText?: string;
  copyrightTextTr?: string;
  footerDescription?: string;
  footerDescriptionTr?: string;

  // 2. Hero
  heroTitle?: string;
  heroTitleTr?: string;
  heroSubtitle?: string;
  heroSubtitleTr?: string;
  heroButtonText?: string;
  heroButtonTextTr?: string;
  heroImageUrl?: string;

  // 3. CTA
  ctaTitle?: string;
  ctaTitleTr?: string;
  ctaDescription?: string;
  ctaDescriptionTr?: string;
  ctaButtonText?: string;
  ctaButtonTextTr?: string;

  // 4. STUDIO (About & Metrics)
  aboutTitle?: string;
  aboutTitleTr?: string;
  aboutDescription?: string;
  aboutDescriptionTr?: string;
  aboutImageUrl?: string;

  metric1Title?: string;
  metric1TitleTr?: string;
  metric1Value?: string;

  metric2Title?: string;
  metric2TitleTr?: string;
  metric2Value?: string;

  metric3Title?: string;
  metric3TitleTr?: string;
  metric3Value?: string;

  // 5. STUDIO (PHILOSOPHY - YENİ MADDELİ YAPI)
  // Eski "philosophyTitle" ve "philosophyDescription" alanlarını silebilirsin veya tutabilirsin.
  // Ancak Studio.tsx artık aşağıdaki alanları kullanıyor:

  philosophySectionTitle?: string;
  philosophySectionTitleTr?: string;

  // Madde 1
  philo1Title?: string;
  philo1TitleTr?: string;
  philo1Desc?: string;
  philo1DescTr?: string;
  philo1IconUrl?: string;

  // Madde 2
  philo2Title?: string;
  philo2TitleTr?: string;
  philo2Desc?: string;
  philo2DescTr?: string;
  philo2IconUrl?: string;

  // Madde 3
  philo3Title?: string;
  philo3TitleTr?: string;
  philo3Desc?: string;
  philo3DescTr?: string;
  philo3IconUrl?: string;

  // Video
  showreelUrl?: string;
  webSiteVisitorCount?: number;

  // 6. Contact
  email?: string;
  phone?: string;
  address?: string;
  addressTr?: string;
  googleMapEmbedCode?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;

  // 7. SEO
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  metaKeywords?: string;
  metaKeywordsTr?: string;
  headScripts?: string;
  robotsTxt?: string;
}