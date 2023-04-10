/**
 * @swagger
 * tags:
 *   name: Analytic Catalog entries (from now on called item/items)
 *   description: API to manage GE Aerospace Analytic catalog items.
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - number
 *         - version
 *         - latestversion
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the item.
 *         number:
 *           type: string
 *           description: The item number.
 *         version:
 *           type: string
 *           description: The item version
 *         latestversion:
 *           type: boolean
 *           description: Specify if is the latest version of the entry (for same number/version)
 *         previousversion:
 *           type: string
 *           description: Specify if the item is derived from a previous version (can be null)
 *         payload:
 *           type: object
 *           description: Payload for analytic entry
 *       example:
 *          number: 1
 *          version: "1.0.0"
 *          previousversion: "1.0.0"
 *          latestversion: true
 *          payload: {"AnalyticCatalogueNewHeaderEntryData":{
 *                          AnalyticCatalogName: "Carlo Serrangeli Analytic",
 *                          AnalyticNumber: 1,
 *                          AnalyticVersion: "1.0.0",
 *                          AnalyticLanguage: [1,2,3,4],
 *                          AnalyticStatus: 1,
 *                          AnalyticActiveFlag: true,
 *                          AnalyticCreatedBy: ["Serrangeli, Carlo (105035002)"],
 *                          AnalyticModifiedBy: null,
 *                          AnalyticCreatedOn: "2023-04-04T20:49:05.000Z",
 *                          AnalyticModifiedOn: "2023-04-04T20:49:05.000Z",
 *                          prev_vers: null,
 *                          next_vers: null
 *                      },
 *                     "AnalyticCatalogueNewSummaryEntryData": {},
 *                     "AnalyticCatalogueNewDocumentationEntryData": {},
 *                     "AnalyticCatalogueNewExecutionEntryData": {},
 *                     "AnalyticCatalogueNewDataIOEntryData": {}
 *                   }
 */

const express = require("express");
const {
  getAllItems,
  createItem,
  getOneItem,
  getLatestItems,
  updateItem,
  deleteItem,
  deleteAllItems,
} = require("../controllers/item.controllers");
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Lists all items (with optional latestversion flag)
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: latestversion
 *         schema:
 *           type: boolean
 *         required: false
 *         description: The latest version (optional) if not specified returns all items
 *     responses:
 *       "200":
 *         description: The list of items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
router.get("/", getAllItems);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Creates a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       "200":
 *         description: The created item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
router.post("/", createItem);

/**
 * @swagger
 * /{id}:
 *     get:
 *       summary: Gets an item by id
 *       tags: [Items]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: The item id
 *       responses:
 *         "200":
 *           description: The item.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Item'
 *         "500":
 *           description: Item id not found.
 */
router.get("/:id", getOneItem);

/**
 * @swagger
 * /{id}:
 *   put:
 *       summary: Updates an item by id
 *       tags: [Items]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: The item id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       responses:
 *         "200":
 *           description: Update was successful.
 *         "500":
 *           description: Error in updating item (Item not found).
 */
router.put("/:id", updateItem);

/**
 * @swagger
 * /{id}:
 *   delete:
 *        summary: Deletes an item by id
 *        tags: [Items]
 *        parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: The item id
 *        responses:
 *          "200":
 *            description: Delete single item successful.
 *          "500":
 *            description: Error in deleting single item (Item not found).
 */
router.delete("/:id", deleteItem);

/**
 * @swagger
 * /:
 *   delete:
 *        summary: Deletes all items
 *        tags: [Items]
 *        responses:
 *          "200":
 *            description: Delete all items successful.
 *          "500":
 *            description: Error in deleting all items.
 */
router.delete("/", deleteAllItems);

module.exports = router;
