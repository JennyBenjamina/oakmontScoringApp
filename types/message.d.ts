export interface Message {
  id: string;
  text: string;
  time: string;
  user: string;
}

export type MessageContextType = {
  chatMessages: Message[];
  saveMessage: (message: Message) => void;
};
