export  interface Message {
    role: string,
    content: string[] | any
}

export interface Thread {
  id: string;
}

export interface UserQuestion {
  threadId: string;
  question: string;
}
