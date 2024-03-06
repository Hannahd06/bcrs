
/**
 * Title: user.ts
 * Author: Professor Richard Krasso
 * Modified by: Jocelyn Dupuis
 *  Date: 02/17/24
 * Description: User Interface for Admin duties
*/

// Export  Statement

export interface User {
    empId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    role: string;
    selectedSecurityQuestions?: {
      questionText: string;
      answerText: string;
    }[];
    isDisabled: boolean;
    lastSignin: number;
}
