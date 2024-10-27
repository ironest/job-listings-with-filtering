import { createStore } from "vuex";
import { ApiResponse, Job } from "../types/Job";

export const store = createStore({
  state() {
    return {
      jobs: [] as Job[],
      filters: [] as string[],
    };
  },
  mutations: {
    setJobs(state, payload: Job[]) {
      state.jobs = payload;
    },
    setFilters(state, newFilter: string) {
      state.filters = [...new Set([...state.filters, newFilter])];
    },
    removeFilter(state, oldFilter: string) {
      state.filters = state.filters.filter(
        (currentFilter: string) => currentFilter !== oldFilter
      );
    },
    removeAllFilters(state) {
      state.filters = [];
    },
  },
  actions: {
    async loadJobs(context) {
      try {
        const response = await fetch("/api/data.json");
        const json = (await response.json()) as ApiResponse[];

        const jobs: Job[] = json.map((job: ApiResponse) => {
          return {
            id: job.id,
            company: job.company,
            logo: job.logo,
            new: job.new,
            featured: job.featured,
            position: job.position,
            miscellaneous: [job.postedAt, job.contract, job.location],
            tags: [job.role, job.level, ...job.tools, ...job.languages],
          };
        });

        context.commit("setJobs", jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    setFilter(context, keyword: string) {
      context.commit("setFilters", keyword);
    },
    removeFilter(context, keyword: string) {
      context.commit("removeFilter", keyword);
    },
    removeAllFilters(context) {
      context.commit("removeAllFilters");
    },
  },
  getters: {
    jobs(state) {
      return state.jobs;
    },
    filters(state) {
      return state.filters;
    },
  },
});
