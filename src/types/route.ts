import type {
    RouteGenericInterface,
    RouteShorthandOptionsWithHandler,
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    FastifyTypeProviderDefault,
    FastifySchema,
} from "fastify";

export type MyRouteOptions<
    T extends RouteGenericInterface = RouteGenericInterface
> = RouteShorthandOptionsWithHandler<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    T,
    unknown,
    FastifySchema,
    FastifyTypeProviderDefault,
    FastifyBaseLogger
>;
