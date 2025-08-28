import z from "zod";

import {
    createUserSchema,
    getUserSchema,
    loginUserSchema,
} from "@/schemas/user.schema.js";

export type CreateUser = z.infer<typeof createUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type GetUser = z.infer<typeof getUserSchema>;
