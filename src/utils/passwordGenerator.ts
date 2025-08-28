import { hash, compare, genSalt } from "bcrypt";

const hashPassword = async (password: string): Promise<string> =>
    await hash(password, await genSalt());

type VerifyPassFn = (
    password: string,
    hashedPassword: string
) => Promise<boolean>;
const verifyPassword: VerifyPassFn = compare;

export default {
    hashPassword,
    verifyPassword,
};
