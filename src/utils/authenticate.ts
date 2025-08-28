import type { FastifyReply, FastifyRequest } from "fastify";

export default async (req: FastifyRequest, res: FastifyReply) => {
    try {
        await req.jwtVerify();
    } catch (e) {
        res.send(e);
    }
};
