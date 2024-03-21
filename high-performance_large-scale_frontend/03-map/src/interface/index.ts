export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
  storeType?: string | null;
  foodCertifyName?: string | null;
  likes?: LikeType[];
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom: number | null;
}

export interface searchType {
  q?: string;
  district?: string;
}

export interface LikeType {
  id: number;
  createdAt: Date;
  storeId: number;
  userId: number;
  store?: StoreType;
}
