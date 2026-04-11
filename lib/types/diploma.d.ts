export interface IDiploma {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean; 
  createdAt: string;
  updatedAt: string;
}

export interface IDiplomaMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IDiplomasResponse {
  data: IDiploma[];
  metadata: IDiplomaMetadata; 
}