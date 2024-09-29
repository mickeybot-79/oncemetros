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
        }),
        sendFeedback: builder.mutation({
            query: ({...feedback}) => ({
                url: '/feedback',
                method: 'POST',
                body: {
                    ...feedback
                }
            })
        })
    })
})

export const { useGetPageViewsQuery, useAddPageViewMutation, useSendFeedbackMutation } = pageApiSlice