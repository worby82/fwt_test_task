import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../constants';
import { ILocation } from '../models/ILocation';

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getLocations: build.query<ILocation[], undefined>({
      query: () => {
        return {
          url: '/locations',
        };
      },
    }),
  }),
});

export const { useGetLocationsQuery } = locationsApi;
