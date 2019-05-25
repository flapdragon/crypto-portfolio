<template>
  <div>
    <v-navigation-drawer :clipped="clipped" v-model="drawerOpen" enable-resize-watcher app dark class="light-blue darken-1">
      <v-list>
        <v-list-tile @click.native.stop="navigate('/')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native.stop="navigate('research')">
          <v-list-tile-action>
            <font-awesome-icon :icon="iconLineChart" class="toolbar-icon-custom" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Research</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.native.stop="navigate('analysis')">
          <v-list-tile-action>
            <font-awesome-icon :icon="iconBarChart" class="toolbar-icon-custom" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Analysis</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="light-blue darken-3" fixed app :clipped-left="clipped" dark>
      <!-- <font-awesome-icon :icon="icon" class="toolbar-icon-custom" @click.stop="drawerOpen = !drawerOpen" /> -->
      <v-toolbar-side-icon @click.stop="drawerOpen = !drawerOpen"></v-toolbar-side-icon>
      <font-awesome-icon :icon="icon" class="toolbar-icon-custom" />
      <v-toolbar-title class="white--text">{{headerTitle}}</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBitcoin } from '@fortawesome/fontawesome-free-brands'
import { faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons'
// import { faChartBar } from '@fortawesome/free-solid-svg-icons'

// library.add(faCoffee)

export default {
  data () {
    return {
      drawerOpen: false,
      clipped: true,
      items: [
        { title: 'Home', icon: 'home' },
        { title: 'Research', icon: 'bar_chart' }
      ],
      headerTitle: 'Home'
    }
  },
  methods: {
    navigate (link) {
      this.title = this.setTitle(link)
      this.drawerOpen = false
      this.$router.push(link.toLowerCase())
    },
    setTitle (link) {
      let title = ''
      switch (link) {
        case '/':
          title = 'Home'
          break
        case 'research':
          title = 'Research'
          break
        case 'analysis':
          title = 'Analysis'
          break
      }
      this.headerTitle = title
    }
  },
  computed: {
    icon () {
      return faBitcoin
    },
    iconLineChart () {
      return faChartLine
    },
    iconBarChart () {
      return faChartBar
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
