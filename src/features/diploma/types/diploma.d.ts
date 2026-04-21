export interface IDiploma extends ITimeStamp {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean; 
  createdAt: string;
  updatedAt: string;
}