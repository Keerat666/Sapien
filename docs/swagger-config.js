module.exports = {
    info: {
      version: "1.0.0",
      title: "Sapien API",
      description: "Swagger docs for Sapien.",
    },
    servers: [
      {
        url: "http://localhost:8009",
        description: "Local Development server"
      }
    ],
    baseDir: __dirname,
    filesPattern: "../routes/*.js",
    swaggerUIPath: "/api-docs",
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: "/v3/api-docs",
    notRequiredAsNullable: false,
    swaggerUiOptions: {}
  };
  