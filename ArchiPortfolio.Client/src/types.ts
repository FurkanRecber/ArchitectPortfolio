export interface Project {
  id: number | string;
  title: string;
  category: string;
  year: string;
  location: string;
  imageUrl: string;
  tag?: string;
  className?: string;
  // Detail Page Fields
  description?: string;
  client?: string;
  area?: string;
  status?: string;
  team?: string;
  pressKitUrl?: string;
  gallery?: string[];
  plans?: string[];
}

export interface Stat {
  id: number;
  label: string;
  value: string;
}


