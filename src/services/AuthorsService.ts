import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../constants';
import { IAuthor } from '../models/IAuthor';

export const authorsApi = createApi({
  reducerPath: 'authorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAuthors: build.query<IAuthor[], undefined>({
      query: () => {
        return {
          url: '/authors',
        };
      },
    }),
  }),
});

export const { useGetAuthorsQuery } = authorsApi;
