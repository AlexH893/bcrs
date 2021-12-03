import { User } from "./user.interface";

export interface SecurityQuestion {
  text: string,
  answer: string,
  isDisabled: boolean
}
