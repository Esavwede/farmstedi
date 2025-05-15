/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     summary: User Signup Route
 *     description: User Signup Route
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: user's firstname
 *                 example: firstname
 *               lastname:
 *                 type: string
 *                 description: user's lastname
 *                 example: lastname
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: youremail@gmail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: password
 *               confirmPassword:
 *                 type: string
 *                 description: User confirm password
 *                 example: password
 *     responses:
 *       '201':
 *         description: Returns user created response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Signup Successful
 *                 success:
 *                   type: boolean
 *                   description: Status of operation
 *                   example: true
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If signup was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Info about operation
 *                   example: Bad Request
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Email field empty'
 *       '422':
 *         description: Invalid Request Body Items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If signup was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Info about operation
 *                   example: Invalid Request Body Items
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Invalid email format'
 *       '409':
 *         description: Account with email exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If signup was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Info about operation
 *                   example: Account with this email exists
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If signup was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Info about operation
 *                   example: Server Error
 */
