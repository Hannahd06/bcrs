import { SecurityQuestionModel } from "./security-question-model";

export interface UserModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  selectedSecurityQuestions: SecurityQuestionModel[];

}
