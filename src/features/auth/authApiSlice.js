import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        createAccount: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    //const { data } = await queryFulfilled
                    await queryFulfilled
                    //console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                    //window.localStorage.setItem('token', accessToken)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        resetPassword: builder.mutation({
            query: ({username, email}) => ({
                url: `/auth/pass`,
                method: 'POST',
                body: {
                    username,
                    email
                }
            })
        }),
        verifyResetToken: builder.mutation({
            query: (token) => ({
                url: '/auth/verify',
                method: 'POST',
                body: {
                    token
                }
            })
        }),
        updateUserPassword: builder.mutation({
            query: ({...userData}) => ({
                url: `/auth/reset`,
                method: 'POST',
                body: {
                    ...userData
                }
            })
        }),
        getUserData: builder.query({
            query: (userId) => ({
                url: `/auth/user/${userId}`,
                method: 'GET'
            }),
            providesTags: (result, error, id) => [{ type: 'User', id }]
        }),
        getUserProfile: builder.query({
            query: (userId) => ({
                url: `/auth/profile/${userId}`,
                method: 'GET'
            }),
            providesTags: (result, error, id) => [{ type: 'User', id }]
        }),
        updateUserData: builder.mutation({
            query: ({ ...user }) => ({
                url: '/auth/update',
                method: 'PUT',
                body: {
                    ...user
                }
            })
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: '/auth/delete',
                method: 'DELETE',
                body: {
                    userId
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        verifyUsername: builder.mutation({
            query: ({ username, tempId }) => ({
                url: '/auth/verify',
                method: 'POST',
                body: {
                    username: username,
                    tempId: tempId
                }
            })
        })
    })
})

export const {
    useLoginMutation,
    useCreateAccountMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useResetPasswordMutation,
    useVerifyResetTokenMutation,
    useUpdateUserPasswordMutation,
    useGetUserDataQuery,
    useVerifyUsernameMutation,
    useGetUserProfileQuery,
    useUpdateUserDataMutation,
    useDeleteUserMutation
} = authApiSlice 