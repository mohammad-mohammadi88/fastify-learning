import userSchema from "@/schemas/user.schema.js";
import {
    getUserHandler,
    loginUserHandler,
    postUserHandler,
} from "@/controllers/user.controller.js";
import type {
    MyRouteOptions,
    CreateUser,
    LoginUser,
    GetUser,
} from "@/types/index.js";

export const createUserOptions: MyRouteOptions<{
    Body: CreateUser;
    Reply: string;
}> = {
    schema: {
        body: userSchema.$ref("createUserSchema"),
        response: {
            201: userSchema.$ref("authResponseSchema"),
        },
    },
    handler: postUserHandler,
};

export const loginUserOptions: MyRouteOptions<{
    Body: LoginUser;
    Reply: string;
}> = {
    schema: {
        body: userSchema.$ref("loginUserSchema"),
        response: {
            200: userSchema.$ref("authResponseSchema"),
        },
    },
    handler: loginUserHandler,
};

export const getUserOptions: MyRouteOptions<{
    Reply: string | GetUser;
}> = {
    schema: {
        response: {
            200: userSchema.$ref("getUserSchema"),
        },
        security: [{ apiKey: [] }],
    },
    handler: getUserHandler,
};
