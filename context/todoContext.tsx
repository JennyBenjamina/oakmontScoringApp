import * as React from 'react';
import { TodoContextType, ITodo } from '../types/todo';

export const TodoContext = React.createContext<TodoContextType | null>(null);

const MessageProvider: React.FC<React.ReactNode> = ({ children }: any) => {
  const [msgs, setMsgs] = React.useState<ITodo[]>([
    {
      id: '1',
      title: 'post 1',
      description: 'this is a description',
      status: 'false',
    },
    {
      id: '2',
      title: 'post 2',
      description: 'this is a description',
      status: 'true',
    },
  ]);
  const saveTodo = (msg: ITodo) => {
    setMsgs([...msgs, msg]);
  };

  return (
    <TodoContext.Provider value={{ msgs, saveTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default MessageProvider;
