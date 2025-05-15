/**
 * @openapi
 * /api/v1/plant/recommend:
 *   post:
 *     summary: Plant Recommendation
 *     description: Plant Recommendation recommends plants based on a given set of inputs
 *     tags:
 *       - Plants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - latitude
 *               - longitude
 *               - plants
 *               - soilType
 *               - area
 *             properties:
 *               latitude:
 *                 type: number
 *                 description: Latitude of the location
 *                 example: 6.5244
 *               longitude:
 *                 type: number
 *                 description: Longitude of the location
 *                 example: 3.3792
 *               plants:
 *                 type: array
 *                 description: List of plants to recommend
 *                 items:
 *                   type: string
 *                 example: ["Plantain"]
 *               soilType:
 *                 type: string
 *                 description: Type of soil
 *                 example: clay
 *               area:
 *                 type: number
 *                 description: Area of the land in square meters
 *                 example: 200
 *     responses:
 *       '200':
 *         description: Returns recommendation response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       plantName:
 *                         type: string
 *                         example: Plantain
 *                       suitabilityScore:
 *                         type: number
 *                         example: 75
 *                       growthPeriod:
 *                         type: string
 *                         example: Plantains thrive in warm climates with consistent temperatures. A 3-month period with an average temperature of 27.13°C is generally suitable, but longer-term data would provide a more accurate assessment.  Growth is optimal in consistently warm conditions.
 *                       averageTemperature:
 *                         type: string
 *                         example: The average temperature of 27.13°C is favorable for plantain growth.  However, consistent temperatures throughout the growing season are more crucial than the average alone.  Fluctuations in temperature can impact yield.
 *                       totalPrecipitation:
 *                         type: string
 *                         example: A total precipitation of 1.64 inches over 3 months is relatively low. Plantains require adequate moisture, especially during the early stages of growth. Supplemental irrigation will likely be necessary, especially given the clay soil type.
 *                       soilType:
 *                         type: string
 *                         example: Clay soil can be challenging for plantains as it can retain too much water, leading to root rot if drainage is poor.  Improving soil drainage (e.g., adding organic matter) is crucial for successful cultivation.
 *                       phValue:
 *                         type: string
 *                         example: Plantains prefer a slightly acidic to neutral soil pH, ideally between 6.0 and 7.0.  Soil testing is recommended to determine the current pH and adjust accordingly.
 *                       irriagation:
 *                         type: string
 *                         example: Given the low precipitation and clay soil, a drip irrigation system is recommended to deliver water directly to the roots and prevent waterlogging.  Regular monitoring of soil moisture is essential.  Use clean, chlorine-free water if possible.
 *                       pestAndDiseases:
 *                         type: string
 *                         example: Common pests include nematodes, aphids, and weevils.  Mitigation strategies include crop rotation, biological control (e.g., introducing beneficial nematodes), and using appropriate insecticides when necessary. Common diseases include bacterial wilt and leaf spot.  Disease management involves using disease-resistant varieties, ensuring good sanitation, and applying fungicides as needed.
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If operation was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Info about operation
 *                   example: Bad Request
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Latitude field empty'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If operation was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Info about operation
 *                   example: Server Error
 */
