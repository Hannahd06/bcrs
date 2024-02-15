/**
 * @openapi
 * tags:
 *   name: users
 */

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
 *       - users
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
 *                     type: integer
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

