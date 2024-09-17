import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const shareville = createApi({
  reducerPath: 'shareville',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPerformance: builder.query({
      query: () => `/fonddata/getperformance`,
    }),
    getPositions: builder.query({
      query: () => `/fonddata/getpositions`,
    }),
    getOsebxPerformance: builder.query({
      query: () => `/osebx/getperformance`,
    }),
    getBothPerformance: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const fonddata = await fetchWithBQ(`/fonddata/getperformance`);
        if (fonddata.error) return { error: fonddata.error };
        let osebx = await fetchWithBQ('/osebx/getperformance');

        if (osebx.error) {
          osebx = {
            data: [],
          };
        }

        return fonddata.data
          ? {
              data: {
                fonddata: fonddata.data,
                osebx: osebx.data,
              },
            }
          : { error: result.error };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPerformanceQuery,
  useGetPositionsQuery,
  useGetOsebxPerformanceQuery,
  useGetBothPerformanceQuery,
} = shareville;
