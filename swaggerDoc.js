/**
 * findAllUsers
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: API for returning a list of users from MongoDB Atlas.
 *     summary: Returns a list of user documents.
 *     responses:
 *       '200':
 *         description: Array of user documents
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

/**
 * findById
 * @openapi
 * /api/users/{empId}:
 *   get:
 *     tags:
 *       - Users
 *     description:  API for returning a user document
 *     summary: returns an user document
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: user document id
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */


/**
 * createUser
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: createUsers
 *     description: API for creating a new User
 *     summary: Creates a  new User document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   empId:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   address:
 *                     type: string
 *                   selectedSecurityQuestions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         questionText:
 *                           type: string
 *                         answerText:
 *                           type: string
 *                   role:
 *                     type: string
 *                   isDisabled:
 *                     type: boolean
 *             required:
 *               - empId
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - role
 *               - isDisabled
 *     responses:
 *       '201':
 *         description: New User created
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid empId
 *       '500':
 *         description: Server Exception
 */


/**
 * updateUser
 * @openapi
 * /api/users/{empId}:
 *   put:
 *     tags:
 *       - Users
 *     name: updateUser
 *     description: API for updating a user
 *     summary: Updates the User document
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   role:
 *                     type: string
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - address
 *               - phoneNumber
 *               - role
 *     responses:
 *       '204':
 *         description:  User updated
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid empId
 *       '500':
 *         description: Server Exception
 */


/**
 * deleteUser
 * @swagger
 * /api/users/{empId}:
 *   delete:
 *     tags:
 *       - Users
 *     name: deleteUser
 *     description: API for deleting / disabling a user
 *     summary: Deletes / disables the User
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: delete user by ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully disabled user
 *       '400':
 *         description: User ID must be a number
 *       '404':
 *         description: User ID not found
 *       '500':
 *         description: Server Exception
 */

/**
 * signin
 * @openapi
 * /api/security/signin:
 *   post:
 *     tags:
 *       - Security
 *     name: signin
 *     summary: Logs the user in
 *     requestBody:
 *       description: Email and password
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User signed in
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Valid username and/or password not found
 *       '500':
 *         description: MongoDB Exception
 */

/**
 * registerUser
 * @openapi
 * /api/security/register:
 *   post:
 *     tags:
 *       - Security
 *     name: registerUser
 *     description: API for registering a new User
 *     summary: Creates a  new User document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   address:
 *                     type: string
 *                   selectedSecurityQuestions:
 *                     minItems: 3
 *                     maxItems: 3
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         questionText:
 *                           type: string
 *                         answerText:
 *                           type: string
 *                   isDisabled:
 *                     type: boolean
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - address
 *               - isDisabled
 *     responses:
 *       '201':
 *         description: New User created
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid empId
 *       '500':
 *         description: Server Exception
 */


/**
 * verifyUsers
 * @openapi
 * /api/security/verify/users/{email}:
 *   post:
 *     tags:
 *       - Security
 *     name: verifyUsers
 *     description: API for verifying a user by email.
 *     summary: Verifies if any registered user contains the inputted email.
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: The email address of the user to verify.
 *     requestBody:
 *       required: true
 *       content:
 *           schema:
 *             type: string
 *     responses:
 *       '200':
 *         description: User verified by email
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found - Invalid email
 *       '500':
 *         description: Internal Server Error
 */



/**
 * verifySecurityQuestions
 * @openapi
 * /api/security/verify/users/{email}/security-questions:
 *   post:
 *     tags:
 *       - Security
 *     name: verifySecurityQuestions
 *     description: Verify a user's security questions by their email address.
 *     summary: Verify Security Questions for a User
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: The email address of the user to verify.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               securityQuestions:
 *                 type: array
 *                 minItems: 3
 *                 maxItems: 3
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                     answerText:
 *                       type: string
 *             required:
 *               - securityQuestions
 *     responses:
 *       200:
 *         description: User's security questions verified successfully.
 *       400:
 *         description: Bad Request. Invalid request format.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */




/**
 * resetPassword
 * @openapi
 * /api/security/users/{email}/reset-password:
 *   post:
 *     tags:
 *       - Security
 *     name: resetPassword
 *     description: Reset a user's password by their email address.
 *     summary: Reset a user's password by email.
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: The email address of the user whose password needs to be reset.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Password reset successful.
 *       400:
 *         description: Bad Request.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * findSelectedSecurityQuestions
 * @openapi
 * /api/users/{email}/security-questions:
 *   post:
 *     tags:
 *       - Users
 *     description:  API for returning a security questions
 *     summary: returns user's security questions
 *     parameters:
 *       - name: email
 *         required: true
 *         description: email entered by user to get associated security questions
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */



/**
 * createInvoice
 * @openapi
 * /api/invoices:
 *   post:
 *     tags:
 *       - Invoices
 *     description: API for creating a new invoice.
 *     summary: Creates a new invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Customers email address.
 *               fullName:
 *                 type: string
 *                 description: Customers full name.
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Service title of the line item.
 *                     price:
 *                       type: number
 *                       description: Price/amount of the line item.
 *                 description: An array of line items for the invoice.
 *               partsAmount:
 *                 type: number
 *                 description: Total amount for the parts.
 *               laborAmount:
 *                 type: number
 *                 description: Total amount for the labor.
 *               lineItemTotal:
 *                 type: number
 *                 description: Total amount for the line items.
 *               invoiceTotal:
 *                 type: number
 *                 description: Total amount for the entire invoice.
 *             required:
 *               - email
 *               - fullName
 *               - lineItems
 *               - partsAmount
 *               - laborAmount
 *               - lineItemTotal
 *               - invoiceTotal
 *     responses:
 *       201:
 *         description: Invoice created successfully.
 *       400:
 *         description: Bad Request/invalid request format.
 *       500:
 *         description: Internal Server Error.
 */