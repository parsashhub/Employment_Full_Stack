import { apiService as api } from "app/store/apiService";

export const addTagTypes = ["category_list", "contract_list"] as const;

const utils = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getJobContracts: build.query({
        query: () => ({ url: `/jobContracts` }),
        providesTags: ["contract_list"],
      }),
      getJobCategories: build.query({
        query: () => ({ url: `/jobCategories?perPage=30&page=1` }),
        providesTags: ["category_list"],
      }),
    }),
  });

export const { useGetJobCategoriesQuery, useGetJobContractsQuery } = utils;
