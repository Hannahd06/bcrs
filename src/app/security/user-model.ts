
/**
 * Title: user.ts
 * Author: Professor Richard Krasso
 * Modified by: Jocelyn Dupuis
 *  Date: 02/17/24
 * Description: User Interface for registration
*/

import { SecurityQuestionModel } from "./security-question-model";

//Create and export the user model
export interface UserModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  selectedSecurityQuestions: SecurityQuestionModel[];

}
