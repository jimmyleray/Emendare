<template>
  <v-layout column align-center>
    <h1>Profile</h1>
    <v-btn @click="logout()">Déconnexion</v-btn>
  </v-layout>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>