module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    number: {
      type: Sequelize.STRING,
    },
    version: {
      type: Sequelize.STRING,
    },
    payload: {
      type: Sequelize.JSON,
      //type: Sequelize.STRING,
    },
    previousversion: {
      type: Sequelize.STRING,
    },
    latestversion: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Item;
};
