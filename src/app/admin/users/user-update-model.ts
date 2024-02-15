/**
 * Title: update-user-model.ts
 * Author: Professor Richard Krasso
 * Modified by: Hannah Del Real
 *  Date: 02/14/24
 * Description: UpdateUserModel Interface for Admin duties
*/

// Interface to set the parameters that admin can update for any user profile
export interface UserUpdateModel {
  firstName: string;
  lastName: string;
  role: string;
}
