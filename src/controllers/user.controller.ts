import type { RouteHandler } from "fastify";

import { userStore } from "@/db/index.js";
import type { CreateUser, GetUser, LoginUser } from "@/types/user.js";
import passwordGenerator from "@/utils/passwordGenerator.js";

export const postUserHandler: RouteHandler<{
    Body: CreateUser;
    Reply: string;
}> = async (req, res) => {
    const body: CreateUser = {
        ...req.body,
        // hash password
        password: await passwordGenerator.hashPassword(req.body.password),
    };

    // create user
    const result = await userStore.createUser(body);

    // error handling
    if (typeof result === "string") {
        const existes = result.includes("Unique");
        return res
            .code(existes ? 400 : 500)
            .send(existes ? "This email already exists" : result);
    }

    // create and return token
    const { password, ...user } = result;
    return await res.code(201).jwtSign(user);
};

export const loginUserHandler: RouteHandler<{
    Body: LoginUser;
    Reply: string;
}> = async (req, res) => {
    const email = req.body.email;

    // existing user with given email
    const result = await userStore.getSingleUser({ email });
    if (result === null) return res.code(404).send("This user doesn't exist");

    // error handling
    if (typeof result === "string") return res.code(500).send(result);

    // check password
    const isPassword = passwordGenerator.verifyPassword(
        req.body.password,
        result.password
    );
    if (!isPassword) return res.code(400).send("Given password is not valid");

    // create and return token
    const { password, ...user } = result;
    return res.code(200).jwtSign(user);
};

export const getUserHandler: RouteHandler<{
    Reply: GetUser | string;
}> = async (req, res) => {
    const id = req.user.id;

    // get user
    const user = await userStore.getSingleUser({ id });

    // check existence
    if (user === null) return res.code(404).send("This user doesn't exist");

    // error handling
    if (typeof user === "string") return res.code(500).send(user);

    // return user
    return res.code(200).send(user);
};
