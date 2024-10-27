<script setup lang="ts">
import { computed, onMounted } from "vue";
import Card from "./card.vue";
import { useStore } from "vuex";
import { Job } from "../types/Job";

const store = useStore();

onMounted(async () => {
  store.dispatch("loadJobs");
});

const filteredJobs = computed((): Job[] => {
  const filters = store.getters.filters;
  const jobs = store.getters.jobs;

  if (!filters.length) {
    return jobs;
  }

  return jobs.filter((job: Job) => {
    return filters.every((filter: string) => job.tags.includes(filter));
  });
});
</script>

<template>
  <div class="card-list-container">
    <Card v-for="job in filteredJobs" :key="job.id" :job="job" />
  </div>
</template>

<style scoped lang="scss">
.card-list-container {
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
