export interface ITodo {
  id: string;
  title: string;
  description: string;
  status: string;
}
export type TodoContextType = {
  msgs: ITodo[];
  saveTodo: (todo: ITodo) => void;
};
