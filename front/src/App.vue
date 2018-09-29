<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title id="app-title" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'Emendare'
    }
  }
}
</script>
