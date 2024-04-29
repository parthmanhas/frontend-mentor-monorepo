export interface ISortOption {
    id: number,
    name: string,
    queryParam: string
}

export const SORT_OPTION: ISortOption[] = [
    { id: 1, name: "Most Upvotes", queryParam: "most_upvotes" },
    { id: 2, name: "Most Downvotes", queryParam: "most_downvotes" },
    { id: 3, name: "Most Comments", queryParam: "most_comments" },
    { id: 4, name: "Least Comments", queryParam: "least_comments" },
]