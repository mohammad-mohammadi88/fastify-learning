import type { MyRouteOptions } from "@/types/route.js";
import { RouteGenericInterface } from "fastify";

type Tags = "Products" | "Users";
export default <T extends RouteGenericInterface>(
    routeOptions: MyRouteOptions<T>,
    tags: Tags
): MyRouteOptions<T> => ({
    ...routeOptions,
    schema: {
        ...routeOptions.schema,
        tags: [tags],
    },
});
