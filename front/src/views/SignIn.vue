<template>
  <v-layout column align-center>
    <h1>Connexion</h1>
    <v-btn @click="login()">Connexion</v-btn>
  </v-layout>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('login').then(() => {
        this.$router.push('profile')
      })
    }
  }
}
</script>