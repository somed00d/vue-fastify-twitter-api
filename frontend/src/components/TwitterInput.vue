<script lang="ts" setup>
import { ref } from "vue";
defineEmits(["twitterUsername"]);
const twitterUsername = ref("");
</script>

<template>
  <input
    type="text"
    v-model="twitterUsername"
    placeholder="Enter username"
    class="twitter__input"
  />
  <button
    class="twitter__button"
    @click="$emit('twitterUsername', twitterUsername)"
  >
    Submit
  </button>
  <hr>
</template>

<style scoped>
hr {
    border: none;
    background: #1DA1F2;
    height: 1px;
    margin: 1rem;
}
.twitter__input {
  padding: 0.5rem;
}
.twitter__button {
    background: none;
    border: none;
    box-shadow: 0 0 0 1px #1DA1F2;
    border-radius: 4px;
    margin-left: 2rem;
    padding: 0.5rem 1rem;
    transition: all 300ms ease-in-out;
}

.twitter__button:hover {
    box-shadow: 0 0 0 2px #1DA1F2;
}
</style>
