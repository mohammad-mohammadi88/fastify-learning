import "fastify";
import "@fastify/jwt";
declare module "fastify" {
    interface FastifyInstance {
        authenticate: (
            req: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>;
    }
}

interface JWTPayload {
    id: number;
    email: string;
    name: string | null;
}
declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: JWTPayload;
        user: JWTPayload;
    }
}
