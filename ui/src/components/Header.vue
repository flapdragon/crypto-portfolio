<template>
  <div>
    <v-navigation-drawer :clipped="clipped" v-model="drawerOpen" enable-resize-watcher app dark class="light-blue darken-1">
      <v-list>
        <router-link to="/" activeClass="active">
          <v-list-tile @click.stop="drawerOpen = false">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/research" activeClass="active">
          <v-list-tile @click.stop="drawerOpen = false">
            <v-list-tile-action>
              <v-icon>bar_chart</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Research</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="light-blue darken-3" fixed app :clipped-left="clipped" dark>
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
