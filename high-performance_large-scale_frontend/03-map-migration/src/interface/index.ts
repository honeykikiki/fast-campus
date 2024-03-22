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
  comments?: CommentType[];
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

export interface CommentType {
  id: number;
  createdAt: Date;
  storeId: number;
  body: string;
  userId: number;
  store?: StoreType;
  user?: UserType;
}

interface UserType {
  id: number;
  email: string;
  name: string | null;
  image: string | null;
}

export interface CommentApiResponse {
  data: CommentType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}
