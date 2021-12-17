import { User } from "./user.interface";

export interface SecurityQuestion {
   _id?: any;
   question: {
    _id: string;
    text: string;
   }
  answer: string;
  isDisabled: boolean;
  text?: string;
}
