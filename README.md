# ACUI Analytic Catalog API list

## Goal

Generate REST API Docs with Swagger to ExpressJS for GE Aerospace Analytic Catalog (CRUD APIs)

## Requirements

Nodejs environment

## Demo

REST API Doc for Analytic Catalog Management (local database storage but configurable to handle remote database storage (AWS))
Use config > db.config.js to handle database configuration
NOTE: To run locally you need to have a postgres database installed in your machine.

## Steps

```
npm install
npm run start
```

Swagger UI on localhost:3000/api-docs

## References

[1] LogRocket - https://blog.logrocket.com/documenting-your-express-api-with-swagger/

[2] Swagger Docs - https://swagger.io/docs/specification/basic-structure/

[3] Swagger-ui-express - https://www.npmjs.com/package/swagger-ui-express
