export interface IExam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
  createdAt: string;
  updatedAt: string;
  questionsCount:number;
  diploma: {
    id: string;
    title: string
  }
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

    diploma: {
      id: string;
      image: string;
      title: string
      description: string;
    }

    questionsCount: number
  }
}