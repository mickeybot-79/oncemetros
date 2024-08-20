import { createEntityAdapter, /*createSelector*/ } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.date - b.date
})

const initialState = postsAdapter.getInitialState()

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => ({
                url: '/posts',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    post.id = post.searchField
                    return post
                })
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Post', id }))
                    ]
                } else return [{ type: 'Post', id: 'LIST' }]
            }
        }),
        createPost: builder.mutation({
            query: ({...post}) => ({
                url: '/posts/new',
                method: 'POST',
                body: {
                    ...post
                }
            })
        }),
        addComment: builder.mutation({
            query: ({...comment}) => ({
                url: '/posts/comment',
                method: 'PUT',
                body: {
                    ...comment
                }
            })
        }),
    })
})

export const {
    useGetPostsQuery,
    useCreatePostMutation,
    useAddCommentMutation
} = postsApiSlice

// export const selectPostsResult = postsApiSlice.endpoints.getPosts.select()

// const selectPostsData = createSelector(
//     selectPostsResult,
//     postsResult => postsResult.data
// )

// export const {
//     selectAll: selectAllPosts,
//     selectById: selectPostById,
//     selectIds: selectPostIds
// } = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)