import { User } from "./user.interface";

export interface SecurityQuestion {
  _id: any;
  text: string,
  answer: string,
  isDisabled: boolean
}
