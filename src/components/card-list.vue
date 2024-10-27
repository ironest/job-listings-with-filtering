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
  <TransitionGroup name="list" tag="ul" class="card-list-container">
    <li v-for="job in filteredJobs" :key="job.id">
      <Card :job="job" />
    </li>
  </TransitionGroup>
</template>

<style scoped lang="scss">
.card-list-container {
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  list-style-type: none;
  position: relative;

  li {
    width: 100%;
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .list-leave-active {
    position: absolute;
  }

  @media only screen and (min-width: 1024px) {
    margin-top: 76px;
  }
}
</style>
