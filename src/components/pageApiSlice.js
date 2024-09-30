import { apiSlice } from "../app/api/apiSlice"

export const pageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPageViews: builder.query({
            query: () => ({
                url: '/page/view/get',
                method: 'GET'
            }),
            providesTags: (result, error, arg) => {
                return [{ type: 'View', id: 'LIST' }]
            }
        }),
        addPageView: builder.mutation({
            query: () => ({
                url: '/page/view',
                method: 'POST'
            })
        }),
        sendFeedback: builder.mutation({
            query: ({...feedback}) => ({
                url: '/page/feedback',
                method: 'POST',
                body: {
                    ...feedback
                }
            })
        }),
        getFeedback: builder.query({
            query: () => ({
                url: '/page/feedback/get',
                method: 'GET'
            }),
            providesTags: (result, error, arg) => {
                return [{ type: 'Feedback', id: 'LIST' }]
            }
        }),
    })
})

export const { useGetPageViewsQuery, useAddPageViewMutation, useSendFeedbackMutation, useGetFeedbackQuery } = pageApiSlice