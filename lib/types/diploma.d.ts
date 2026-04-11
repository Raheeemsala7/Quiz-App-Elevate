export interface IDiploma {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IDiplomasResponse {
  data: IDiploma[];
  pagination: IPagination;
}