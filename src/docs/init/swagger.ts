import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { Express } from "express-serve-static-core";

export function swaggerInit(app: Express) {
  try {
    const options: swaggerJSDoc.Options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Farmstedi",
          description: "Farmstedi API documentation for all routes",
          version: "1.0.0",
        },
      },
      apis: ["./src/docs/**/*.ts"],
    };

    const openapiSpecs = swaggerJSDoc(options);

    app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecs));
  } catch (e: any) {
    console.error(e, "SWAGGER INIT ERROR");
    console.log(e);
  }
}
