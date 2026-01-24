// Backend'den gelen veri yapısı (ProjectDto ile birebir uyumlu)
export interface Project {
  id: number;
  title: string;
  slug: string;

  description: string; // Kısa açıklama (Listelerde görünür)
  details: string;     // Uzun detay (Detay sayfasında görünür)

  imageUrl: string;    // Kapak resmi
  category: string;    // Kategori ismi (örn: Residential)

  year: string;
  location: string;
  client: string;
  area: string;
  status: string;
  team: string;

  gallery: string[];   // Normal resim URL listesi
  plans: string[];     // Mimari plan URL listesi

  // Frontend UI için gerekli olabilecek opsiyonel alanlar (Grid yapısı vs.)
  className?: string;
}

// İstatistikler için (değişmedi)
export interface Stat {
  id: number;
  label: string;
  value: string;
}