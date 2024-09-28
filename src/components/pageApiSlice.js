import { apiSlice } from "../app/api/apiSlice"

export const pageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPageViews: builder.query({
            query: () => ({
                url: '/pageView/get',
                method: 'GET'
            }),
            providesTags: (result, error, arg) => {
                return [{ type: 'View', id: 'LIST' }]
            }
        }),
        addPageView: builder.mutation({
            query: () => ({
                url: '/pageView',
                method: 'POST'
            })
        })
    })
})

export const { useGetPageViewsQuery, useAddPageViewMutation } = pageApiSlice