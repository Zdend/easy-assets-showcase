/**
 * This is a workaround for queries that are not being refetched
 * Refetch queries so far only works if the query is being present.
 * If the component is unmounted, the query is still present in the apollo cache
 * but does not get refetched on the re-mount.
 * @param cache
 * @param pattern
 */
export const deleteCache = (pattern: string | RegExp, customRegexp?: boolean) => (
  cache: any
): void => {
  const keys = Object.keys(cache?.data?.data ?? {});

  const matchingQueries = keys.filter(key => {
    const regexp = customRegexp ? pattern : new RegExp(`^\\$ROOT_QUERY\\.${pattern}.*`);
    return (regexp as RegExp).test(key);
  });

  matchingQueries.forEach(key => cache.data.delete(key));
};
