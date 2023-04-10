const db = require("../models");
const Item = db.items;
// const Op = db.Sequelize.Op;

/**
 * Summary.
 * getAllItems
 * Description.
 * Get All Items
 * @param {*} req
 * @param {*} res
 */
const getAllItems = (req, res) => {
  const latestversion = req.query.latestversion;
  var condition = latestversion ? { latestversion: latestversion } : null;

  Item.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Items.",
      });
    });
};

/**
 * Summary.
 * createItem
 * Description.
 * Create a new Item
 * @param {*} req
 * @param {*} res
 */
const createItem = (req, res) => {
  // Validate request
  if (!req.body.number || !req.body.version) {
    res.status(400).send({
      message: "Number or Version can not be empty!",
    });
    return;
  }

  // Create an Item
  const item = {
    number: req.body.number,
    version: req.body.version,
    previousversion: req.body.previousversion,
    payload: req.body.payload,
    latestversion: req.body.latestversion ? req.body.latestversion : true,
  };

  // Save Item in the database
  Item.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item.",
      });
    });
};

/**
 * Summary.
 * getOneItem
 * Description.
 *  Get One Item (by id)
 * @param {*} req
 * @param {*} res
 */
const getOneItem = (req, res) => {
  const id = req.params.id;

  Item.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Item with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id,
      });
    });
};

/**
 * Summary.
 * updateItem
 * Description.
 * Update an Item by the id in the request
 * @param {*} req
 * @param {*} res
 */
const updateItem = (req, res) => {
  const id = req.params.id;

  Item.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or request is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Item with id=" + id,
      });
    });
};

/**
 * Summary.
 * deleteItem
 * Description.
 * Delete a item by the id in the request
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {
  const id = req.params.id;

  Item.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Item with id=${id}. Maybe Item was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Item with id=" + id,
      });
    });
};

/**
 * Summary.
 * deleteAllItems
 * Description.
 * Delete all items. Only use this API in development. This should never be used in production
 * @param {*} req
 * @param {*} res
 */
const deleteAllItems = (req, res) => {
  Item.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Items were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Items.",
      });
    });
};

module.exports = {
  getAllItems,
  createItem,
  getOneItem,
  updateItem,
  deleteItem,
  deleteAllItems,
};
