export interface IExam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
  createdAt: string;
  updatedAt: string;
}


export interface IExamInfo {
  exam: {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    diplomaId: string;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;

    diploma: IDiploma;

    questionsCount: number
  }
}