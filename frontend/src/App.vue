<script setup lang="ts">
import { ref } from 'vue'
import TwitterInput from './components/TwitterInput.vue';
import TwitterOutput from './components/TwitterOutput.vue';
const twitterData = ref({})
function getUsernameData(twitterUsername: string) {
  fetch(
    `http://localhost:4200/twitter/user/${twitterUsername}`
  )
    .then(response => response.json())
    .then(data => twitterData.value = data)
}
</script>

<template>
  <TwitterInput @twitter-username="getUsernameData($event)"/>
  <TwitterOutput :twitter-data="twitterData" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
