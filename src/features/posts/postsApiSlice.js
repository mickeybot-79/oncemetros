import { apiSlice } from "../../app/api/apiSlice"

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => ({
                url: '/posts',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            })
        })
    })
})

export const {
    useGetPostsQuery
} = postsApiSlice