import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { fastifyJwt } from "@fastify/jwt";
import { JsonSchema } from "fastify-zod";
import { styleText } from "node:util";
import fastify from "fastify";
import "dotenv/config";

import { productSchema, userSchema } from "./schemas/index.js";
import { userRoute, productRoute } from "./routes/index.js";
import packageJson from "./utils/package-json.js";
import authenticate from "./utils/authenticate.js";
import defaults from "./config/defaults.js";
import prisma from "./db/prisma.js";

const { host, port, secret } = defaults;

// create instance
const server = fastify();

// initialize swagger docs
await server.register(fastifySwagger, {
    swagger: {
        info: {
            title: "My first fastify api",
            description: "API documentation with Swagger",
            version: packageJson.version,
        },
        host: `${host}:${port}`,
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
    },
});

await server.register(fastifySwaggerUi, {
    routePrefix: "/api-docs",
    uiConfig: {
        docExpansion: "list",
        deepLinking: false,
    },
});

// authentication decorator
server.decorate("authenticate", authenticate);

// schema adder
const addNewSchemas = (schemas: JsonSchema[]) =>
    schemas.forEach((schema) => server.addSchema(schema));

// setup server
(async () => {
    // connect prisma
    await prisma.$connect();
    console.log(styleText("greenBright", "\n✅ Prisma Connected\n"));

    // add schemas
    addNewSchemas(userSchema.schemas);
    addNewSchemas(productSchema.schemas);

    // jwt
    await server.register(fastifyJwt, { secret });

    // routes
    await server.register(userRoute, { prefix: "/api/users" });
    await server.register(productRoute, { prefix: "/api/products" });

    // start server
    server.listen({ port, host }, async (error, address) => {
        if (error) {
            // log error
            server.log.error(error, error.message);

            // disconnect prisma
            await prisma.$disconnect();
            console.log(styleText("redBright", "Prisma Disconnected"));

            // exit
            return process.exit(1);
        }

        console.log(`server is running on ${address}`);
    });
})();
