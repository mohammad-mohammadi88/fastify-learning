export default async <T>(
    fn: () => Promise<T>,
    action: string
): Promise<T | string> =>
    await fn().catch((e) => {
        return e?.message ?? `Unexpected Error happend while ${action}`;
    });
