<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const removeAllFilters = () => {
  store.dispatch("removeAllFilters");
};

const removeFilter = (filter: string) => {
  store.dispatch("removeFilter", filter);
};
</script>

<template>
  <Transition name="bounce">
    <div v-if="store.getters.filters.length" class="filter-bar-container">
      <TransitionGroup name="list" tag="ul" class="filter-list">
        <li
          v-for="filter in store.getters.filters"
          class="filter"
          :key="filter"
        >
          <span>{{ filter }}</span>
          <button class="remove-filter" @click="removeFilter(filter)">
            &times;
          </button>
        </li>
      </TransitionGroup>
      <button class="clear" @click="removeAllFilters">Clear</button>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use "../assets/variables" as *;

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
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

.filter-bar-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: -36px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 15px 20px -5px $color-shadow;
  -webkit-box-shadow: 0px 15px 20px -5px $color-shadow;
  -moz-box-shadow: 0px 15px 20px -5px $color-shadow;

  .clear {
    background-color: transparent;
    border: 0;
    color: $color-secondary;
    font-size: 16px;
    font-weight: $font-weight-bold;
    line-height: 24px;
    cursor: pointer;

    &:hover {
      color: $color-primary;
      text-decoration: underline;
    }
  }

  @media only screen and (min-width: 1024px) {
    margin-bottom: -36px;
  }
}

.filter-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-right: auto;

  .filter {
    height: 32px;
    display: flex;
    align-items: center;

    span {
      background-color: $color-background-body;
      line-height: 24px;
      padding: 5px 8px 3px 8px;
      color: $color-primary;
      font-size: 16px;
      font-weight: $font-weight-bold;
      border-radius: 4px 0 0 4px;
    }

    .remove-filter {
      border: 0;
      width: 32px;
      height: 32px;
      border-radius: 0 4px 4px 0;
      background-color: $color-primary;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: $font-weight-bold;
      font-size: 30px;
      color: $color-background-body;
      cursor: pointer;

      &:hover {
        background-color: $color-almost-black;
      }
    }
  }
}
</style>
