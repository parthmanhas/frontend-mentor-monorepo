export const SORT_OPTIONS: { name: string, field: string, order: 'asc' | 'desc' }[] = [
    {
        name: "Most Upvotes",
        field: "upvotes",
        order: "desc"
    },
    {
        name: "Least Upvotes",
        field: "upvotes",
        order: "asc"
    },
    {
        name: "Most Comments",
        field: "comments",
        order: "desc"
    },
    {
        name: "Least Comments",
        field: "comments",
        order: "asc"
    },
]

// TODO: remove this hardcode
export const USER_EMAIL = 'Lou_Ortiz17@hotmail.com';

export const FEEDBACK_PER_PAGE = 10;