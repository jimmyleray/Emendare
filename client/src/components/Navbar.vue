<template>
  <v-toolbar id="main-navbar" color="teal" card dark flat prominent extended>
    <v-toolbar-items>
      <v-btn id="app-title" to="/" exact flat>Emendare</v-btn>
      <v-btn to="/explore" flat>Explorer</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="/profile" v-if="isLoggedIn" flat>Mon Profil</v-btn>
      <v-btn to="/signin" v-if="!isLoggedIn" flat>Connexion</v-btn>
      <v-tooltip bottom>
        <v-btn slot="activator" href="https://gitlab.com/emendare/emendare" target="_blank" flat icon>
          <v-icon>fab fa-gitlab</v-icon>
        </v-btn>
        <span>GitLab</span>
      </v-tooltip>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style scoped>
#main-navbar {
  z-index: 0;
}
</style>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>