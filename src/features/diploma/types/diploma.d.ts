export interface IDiploma extends ITimeStamp {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean; 
  createdAt: string;
  updatedAt: string;
}

export type MinimalDiploma = {
    id: string;
    title: string;
};