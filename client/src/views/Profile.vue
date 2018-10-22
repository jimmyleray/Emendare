<template>
  <v-layout column align-center>
    <h1>Profil</h1>
    <v-btn color="error" @click="logout()">Déconnexion</v-btn>
  </v-layout>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('LOGOUT')
      this.$router.push('/')
    }
  }
}
</script>