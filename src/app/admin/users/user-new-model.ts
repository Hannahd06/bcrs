/**
 * Title: user-new-model.ts
 * Author: Professor Richard Krasso
 * Modified by: Jocelyn Dupuis
 *  Date: 02/17/24
 * Description: NewUserModel Interface for Admin duties
*/

// Interface to set the parameters so admin can create a new user
export interface NewUserModel {
  empId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  role: string;
}
