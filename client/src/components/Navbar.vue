<template>
  <v-toolbar app dark>
    <v-toolbar-items>
      <v-btn id="app-title" to="/" exact flat>Emendare</v-btn>
      <v-btn to="/explore" flat>Explorer</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="/groups" v-if="isLoggedIn" flat>Mes groupes</v-btn>
      <v-btn to="/texts" v-if="isLoggedIn" flat>Mes textes</v-btn>
      <v-btn to="/profile" v-if="isLoggedIn" flat>Mon Profil</v-btn>
      <v-btn to="/signin" v-if="!isLoggedIn" flat>Connexion</v-btn>
      <v-btn href="https://github.com/jimmyleray/emendare" target="_blank" flat icon>
        <v-icon>fab fa-github</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>