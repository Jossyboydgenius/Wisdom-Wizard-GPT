import { OptimisticLocalStore } from "../browser/index.js";
import { FunctionReturnType, PaginationOptions, PaginationResult } from "../server/index.js";
import { FunctionArgs, FunctionReference } from "../server/api.js";
import { BetterOmit, Expand } from "../type_utils.js";
/**
 * A {@link server.FunctionReference} that is usable with {@link usePaginatedQuery}.
 *
 * This function reference must:
 * - Refer to a public query
 * - Have an argument named "paginationOpts" of type {@link server.PaginationOptions}
 * - Have a return type of {@link server.PaginationResult}.
 *
 * @public
 */
export type PaginatedQueryReference = FunctionReference<"query", "public", {
    paginationOpts: PaginationOptions;
}, PaginationResult<any>>;
/**
 * Load data reactively from a paginated query to a create a growing list.
 *
 * This can be used to power "infinite scroll" UIs.
 *
 * This hook must be used with public query references that match
 * {@link PaginatedQueryReference}.
 *
 * `usePaginatedQuery` concatenates all the pages of results into a single list
 * and manages the continuation cursors when requesting more items.
 *
 * Example usage:
 * ```typescript
 * const { results, status, isLoading, loadMore } = usePaginatedQuery(
 *   api.messages.list,
 *   { channel: "#general" },
 *   { initialNumItems: 5 }
 * );
 * ```
 *
 * If the query reference or arguments change, the pagination state will be reset
 * to the first page. Similarly, if any of the pages result in an InvalidCursor
 * error or an error associated with too much data, the pagination state will also
 * reset to the first page.
 *
 * To learn more about pagination, see [Paginated Queries](https://docs.convex.dev/database/pagination).
 *
 * @param query - A FunctionReference to the public query function to run.
 * @param args - The arguments object for the query function, excluding
 * the `paginationOpts` property. That property is injected by this hook.
 * @param options - An object specifying the `initialNumItems` to be loaded in
 * the first page.
 * @returns A {@link UsePaginatedQueryResult} that includes the currently loaded
 * items, the status of the pagination, and a `loadMore` function.
 *
 * @public
 */
export declare function usePaginatedQuery<Query extends PaginatedQueryReference>(query: Query, args: PaginatedQueryArgs<Query> | "skip", options: {
    initialNumItems: number;
}): UsePaginatedQueryReturnType<Query>;
/**
 * Reset pagination id for tests only, so tests know what it is.
 */
export declare function resetPaginationId(): void;
/**
 * The result of calling the {@link usePaginatedQuery} hook.
 *
 * This includes:
 * - `results` - An array of the currently loaded results.
 * - `isLoading` - Whether the hook is currently loading results.
 * - `status` - The status of the pagination. The possible statuses are:
 *   - "LoadingFirstPage": The hook is loading the first page of results.
 *   - "CanLoadMore": This query may have more items to fetch. Call `loadMore` to
 *   fetch another page.
 *   - "LoadingMore": We're currently loading another page of results.
 *   - "Exhausted": We've paginated to the end of the list.
 * - `loadMore(n)` A callback to fetch more results. This will only fetch more
 * results if the status is "CanLoadMore".
 *
 * @public
 */
export type UsePaginatedQueryResult<Item> = {
    results: Item[];
    loadMore: (numItems: number) => void;
} & ({
    status: "LoadingFirstPage";
    isLoading: true;
} | {
    status: "CanLoadMore";
    isLoading: false;
} | {
    status: "LoadingMore";
    isLoading: true;
} | {
    status: "Exhausted";
    isLoading: false;
});
/**
 * The possible pagination statuses in {@link UsePaginatedQueryResult}.
 *
 * This is a union of string literal types.
 * @public
 */
export type PaginationStatus = UsePaginatedQueryResult<any>["status"];
/**
 * Given a {@link PaginatedQueryReference}, get the type of the arguments
 * object for the query, excluding the `paginationOpts` argument.
 *
 * @public
 */
export type PaginatedQueryArgs<Query extends PaginatedQueryReference> = Expand<BetterOmit<FunctionArgs<Query>, "paginationOpts">>;
/**
 * Given a {@link PaginatedQueryReference}, get the type of the item being
 * paginated over.
 * @public
 */
export type PaginatedQueryItem<Query extends PaginatedQueryReference> = FunctionReturnType<Query>["page"][number];
/**
 * The return type of {@link usePaginatedQuery}.
 *
 * @public
 */
export type UsePaginatedQueryReturnType<Query extends PaginatedQueryReference> = UsePaginatedQueryResult<PaginatedQueryItem<Query>>;
/**
 * Optimistically update the values in a paginated list.
 *
 * This optimistic update is designed to be used to update data loaded with
 * {@link usePaginatedQuery}. It updates the list by applying
 * `updateValue` to each element of the list across all of the loaded pages.
 *
 * This will only apply to queries with a matching names and arguments.
 *
 * Example usage:
 * ```ts
 * const myMutation = useMutation(api.myModule.myMutation)
 * .withOptimisticUpdate((localStore, mutationArg) => {
 *
 *   // Optimistically update the document with ID `mutationArg`
 *   // to have an additional property.
 *
 *   optimisticallyUpdateValueInPaginatedQuery(
 *     localStore,
 *     api.myModule.paginatedQuery
 *     {},
 *     currentValue => {
 *       if (mutationArg === currentValue._id) {
 *         return {
 *           ...currentValue,
 *           "newProperty": "newValue",
 *         };
 *       }
 *       return currentValue;
 *     }
 *   );
 *
 * });
 * ```
 *
 * @param localStore - An {@link OptimisticLocalStore} to update.
 * @param query - A {@link FunctionReference} for the paginated query to update.
 * @param args - The arguments object to the query function, excluding the
 * `paginationOpts` property.
 * @param updateValue - A function to produce the new values.
 *
 * @public
 */
export declare function optimisticallyUpdateValueInPaginatedQuery<Query extends PaginatedQueryReference>(localStore: OptimisticLocalStore, query: Query, args: PaginatedQueryArgs<Query>, updateValue: (currentValue: PaginatedQueryItem<Query>) => PaginatedQueryItem<Query>): void;
//# sourceMappingURL=use_paginated_query.d.ts.map