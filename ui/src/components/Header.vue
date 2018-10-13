<template>
  <div>
    <v-navigation-drawer :clipped="clipped" v-model="drawerOpen" enable-resize-watcher app dark class="blue lighten-3">
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="navigate(item.title)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" fixed app :clipped-left="clipped" dark>
      <!-- <font-awesome-icon :icon="icon" class="toolbar-icon-custom" @click.stop="drawerOpen = !drawerOpen" /> -->
      <v-toolbar-side-icon @click.stop="drawerOpen = !drawerOpen"></v-toolbar-side-icon>
      <font-awesome-icon :icon="icon" class="toolbar-icon-custom" />
      <v-toolbar-title class="white--text">Crypto Research</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faBitcoin } from '@fortawesome/fontawesome-free-brands'

export default {
  data () {
    return {
      drawerOpen: false,
      clipped: true,
      items: [
        { title: 'Home', icon: 'home' },
        { title: 'Research', icon: 'bar_chart' }
      ]
    }
  },
  methods: {
    navigate (link) {
      console.log('watch me as i navigate ha ha ha ha ha', link)
    }
  },
  computed: {
    icon () {
      return faBitcoin
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<style scoped>
.toolbar-icon-custom {
  font-size: 28px;
}
</style>
