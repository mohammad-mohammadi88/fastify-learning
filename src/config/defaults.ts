export default {
    secret: process.env.JWT_SECRET!,
    port: Number(process.env.PORT!),
    host: "0.0.0.0",
};
