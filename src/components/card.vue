<script setup lang="ts">
import { useStore } from "vuex";
import { Job } from "../types/Job";

defineProps<{ job: Job }>();

const store = useStore();
const setFilter = (filter: string) => {
  store.dispatch("setFilter", filter);
};
</script>

<template>
  <div class="card-container" :class="{ featured: job.featured }">
    <img class="logo" :src="job.logo" alt="company logo" />
    <div class="info">
      <p class="title">
        <span class="company">{{ job.company }}</span>
        <span class="new" v-if="job.new">new!</span>
        <span class="featured" v-if="job.featured">featured</span>
      </p>
      <p class="position">{{ job.position }}</p>
      <p class="misc">
        <span v-for="misc in job.miscellaneous">{{ misc }}</span>
      </p>
    </div>
    <div class="tags">
      <button v-for="tag in job.tags" @click="setFilter(tag)">{{ tag }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/variables.scss" as *;

.card-container {
  position: relative;
  background-color: white;
  padding: 32px 24px 24px;
  border-radius: 5px;

  box-shadow: 0px 15px 20px -5px $color-shadow;
  -webkit-box-shadow: 0px 15px 20px -5px $color-shadow;
  -moz-box-shadow: 0px 15px 20px -5px $color-shadow;

  &.featured {
    border-left: 5px solid $color-primary;
  }

  .logo {
    width: 48px;
    height: 48px;
    position: absolute;
    top: -24px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      .company {
        color: $color-primary;
        font-size: 13px;
        font-weight: $font-weight-bold;
        margin-right: 15px;
      }
      .new,
      .featured {
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        color: white;
        font-size: 14px;
        line-height: 14px;
        font-weight: $font-weight-bold;
        background-color: $color-primary;
        padding: 6px 8px 4px 8px;
        border-radius: 12px;
      }
      .featured {
        background-color: $color-almost-black;
      }
    }

    .position {
      color: $color-almost-black;
      font-size: 15px;
      font-weight: $font-weight-bold;
      line-height: 24px;
    }
    .misc {
      color: $color-secondary;
      font-size: 16px;
      font-weight: $font-weight-base;
      line-height: 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 36px;

      span::before {
        content: "";
        position: absolute;
        margin-left: -18px;
        margin-top: 9px;
        width: 4px;
        height: 4px;
        border-radius: 50px;
        background-color: $color-secondary;
      }

      span:first-child::before {
        display: none;
      }
    }
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    border-top: 1px solid $color-secondary;
    padding-top: 16px;
    margin-top: 16px;
    button {
      background-color: $color-background-body;
      padding: 4px 8px;
      border-radius: 4px;
      line-height: 24px;
      color: $color-primary;
      font-size: 16px;
      font-weight: $font-weight-bold;
      border: 0;
      letter-spacing: -0.12px;
      cursor: pointer;

      &:hover {
        color: $color-background-body;
        background-color: $color-primary;
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .card-container {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 32px 40px;
    gap: 24px;

    .logo {
      position: static;
      width: 88px;
      height: 88px;
    }

    .info {
      .title {
        .company {
          font-size: 18px;
        }
      }
      .position {
        font-size: 22px;
      }
      .misc {
        font-size: 18px;
      }
    }

    .tags {
      border: 0;
      padding: 0;
      margin: 0;
      margin-left: auto;
    }
  }
}
</style>
