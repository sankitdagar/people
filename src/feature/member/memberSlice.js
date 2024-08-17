import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/members' }),
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: ({ name, status, email, team, role }) => {
        // Construct query parameters
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        if (status) params.append('status', status);
        if (role) params.append('role', encodeURIComponent(role));

        return `/get?${params.toString()}`;
      },
    }),
    addMember: builder.mutation({
      query: (newMember) => ({
        url: '/add',
        method: 'POST',
        body: newMember,
      }),
    }),
    editMember: builder.mutation({
      query: ({ id, rest }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetMembersQuery, useAddMemberMutation, useEditMemberMutation, useDeleteMemberMutation } = memberApi;
