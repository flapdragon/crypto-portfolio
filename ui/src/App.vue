<template>
  <div id="app">
    <v-app>
      <app-header></app-header>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    appHeader: Header
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
}
</style>
