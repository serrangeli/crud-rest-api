module.exports = {
  HOST: "apggead2.cluster-ctntmwpfqdbp.us-east-1.rds.amazonaws.com",
  USER: "105035002",
  PASSWORD: "Emi2023Se",
  DB: "apgsoard1",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

/* module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};*/
