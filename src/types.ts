export interface Farmer {
  id: string;
  name: string;
  village: string;
  avatar: string;
  verified: boolean;
}

export enum SubmissionStatus {
  Diterima = "Diterima",
  Menunggu = "Menunggu",
  Draft = "Draft",
  Ditolak = "Ditolak",
}

export interface CropSubmission {
  id: string;
  farmerId: string;
  farmerName: string;
  commodity: string;
  type: string; // Padi, Jagung, Kedelai, etc.
  volume: number; // in Kg
  landArea?: string; // e.g. "1.5 Hektar"
  date: string;
  status: SubmissionStatus;
}

export interface MarketProduct {
  id: string;
  name: string;
  category: "Beras" | "Sayur" | "Biji-bijian" | "Lainnya";
  origin: string;
  price: number;
  unit: string;
  image: string;
  available: boolean;
  stock: number;
  farmerName: string;
  cooperative: string;
  harvestDate: string;
  method: string;
  elevation: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  desc: string;
}

export interface Trader {
  name: string;
  tier: string;
  trustScore: number;
  totalVolume: number;
  totalSpending: number;
  activeContracts: number;
}

export interface TraderOrder {
  id: string;
  commodity: string;
  origin: string;
  amount: number; // calculated Total price
  quantity: number; // in kg
  status: "Processing" | "Shipped" | "Completed" | "Cancelled";
  date: string;
  image: string;
  grade: string;
}
