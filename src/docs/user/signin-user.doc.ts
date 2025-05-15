/**
 * @openapi
 * /api/v1/auth/signin:
 *   post:
 *     summary: User Signin
 *     description: Signs in a user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Valid user email
 *                 example: youremail@gmail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: password
 *     responses:
 *       '200':
 *         description: Successful response with user data and tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userData:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: Unique identifier for the user.
 *                           example: 682349468104289a17509285
 *                         firstname:
 *                           type: string
 *                           description: User's first name.
 *                           example: firstname
 *                         lastname:
 *                           type: string
 *                           description: User's last name.
 *                           example: lastname
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           description: JWT access token for user authentication.
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                         refreshToken:
 *                           type: string
 *                           description: JWT refresh token for obtaining new access tokens.
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         security:
 *           - bearerAuth: []
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the operation
 *                   example: Bad Request
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Input Email'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates that authentication failed
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 *                   example: Unauthorized Access
 *       '403':
 *         description: User Not Verified to access dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User Not Verified to access dashboard
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates that the requested resource was not found
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Detailed error message
 *                   example: 'Resource not found'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Description of the server error
 *                   example: Internal Server Error
 */
