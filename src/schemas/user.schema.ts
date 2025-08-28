import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

// default schemas
const email = z
    .string({
        required_error: "Email is required",
    })
    .email("Please send a valid Email");
const password = z
    .string({
        required_error: "Password is required",
        invalid_type_error: "Password should be typeof string",
    })
    .min(8, "Password should contain at least 8 characters");
const name = z.string().optional().nullable();
const id = z.number();
const token = z.string();
const userCore = { email, name };

// schemas
export const createUserSchema = z.object({ ...userCore, password });

const authResponseSchema = z.object({ token });

export const loginUserSchema = z.object({ email, password });

export const getUserSchema = z.object({ id, email, name });

export default buildJsonSchemas(
    {
        authResponseSchema,
        createUserSchema,
        getUserSchema,
        loginUserSchema,
    },
    { $id: "UserSchemas" }
);
