<script setup lang="ts">
import CardList from "./components/card-list.vue";
import FilterBar from "./components/filter-bar.vue";
</script>

<template>
  <header />
  <main>
    <FilterBar />
    <CardList />
  </main>
</template>

<style scoped lang="scss">
@use "./assets/variables" as *;

header {
  width: 100%;
  height: 156px;
  background-image: url("/images/bg-header-desktop.svg");
  background-repeat: no-repeat;
  background-position: top right;
  background-color: $color-background-header;

  @media only screen and (min-width: 1024px) {
    background-position: top center;
  }
}

main {
  max-width: 1110px;
  margin: 0 auto 34px;
  padding: 0 24px;

  @media only screen and (min-width: 1024px) {
    padding: 0;
  }
}
</style>
