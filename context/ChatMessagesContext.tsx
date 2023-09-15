import * as React from 'react';
import { MessageContextType, Message } from '../types/message';

export const ChatMessagesContext =
  React.createContext<MessageContextType | null>(null);

const ChatMessagesProvider: React.FC<React.ReactNode> = ({ children }: any) => {
  const [chatMessages, setChatMessages] = React.useState<Message[]>([
    {
      id: '123a',
      text: 'hello yall',
      time: '4:30',
      user: 'benjamina',
    },
    {
      id: '124a',
      text: 'see yall',
      time: '14:30',
      user: 'benjaminassss',
    },
  ]);

  const saveMessage = (message: Message) => {
    setChatMessages([...chatMessages, message]);
  };
  return (
    <ChatMessagesContext.Provider value={{ chatMessages, saveMessage }}>
      {children}
    </ChatMessagesContext.Provider>
  );
};

export default ChatMessagesProvider;
