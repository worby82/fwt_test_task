import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL, PAINTINGS_LIMIT } from '../constants';
import { IPainting } from '../models/IPainting';
import { IPaintingsRequestArguments, IPaintingsRequestData } from '../interfaces';

export const paintingsApi = createApi({
  reducerPath: 'paintingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPaintings: build.query<
      IPaintingsRequestData,
      { page: number; args: IPaintingsRequestArguments | null }
    >({
      query: ({ page = 1, args }) => {
        return {
          url: '/paintings',
          params: {
            _page: page,
            _limit: PAINTINGS_LIMIT,
            ...args,
          },
        };
      },
      transformResponse(data: IPainting[], meta): IPaintingsRequestData {
        return { data, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) };
      },
    }),
  }),
});

export const { useGetPaintingsQuery } = paintingsApi;
