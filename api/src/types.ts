export type QuestionsFilter = {
  categories: string[];
};

export interface IQuestion {
  id: number;
  description?: string;
  categories: ICategory[];
  question: string;
  rightAnswers: string;
  url?: string;
}

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  published: boolean;
  createdAt: string;
}
