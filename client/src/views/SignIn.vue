<template>
  <v-layout column align-center fill-height>
    <v-card class="card-content">
      <v-toolbar card>
        <v-spacer></v-spacer>
        <v-toolbar-title>Connexion à votre compte</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout column align-center style="margin-top:3rem;">
        <v-form id="signInForm" v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Mot de passe"
            required
          ></v-text-field>
          <v-btn block @click="login(email, password)" color="success" :disabled="!valid">Connexion</v-btn>
          <v-alert :value="true" v-if="message" type="error" transition="scale-transition">{{message}}</v-alert>
          <v-btn block to="/signup" flat>Créer un compte</v-btn>
        </v-form>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<style scoped>
#signInForm {
  width: 100%;
  max-width: 350px;
}
</style>

<script>
import { api, headers } from '../utils/api'

export default {
  data: () => ({
    message: '',
    valid: false,
    email: '',
    emailRules: [
      v => !!v || "L'adresse mail est requise",
      v => /.+@.+/.test(v) || "L'adresse mail est invalide"
    ],
    password: '',
    passwordRules: [v => !!v || 'Le mot de passe est requis']
  }),
  methods: {
    login: function(email, password) {
      fetch(api('/login'), {
        method: 'post',
        headers: headers(),
        body: JSON.stringify({
          password,
          email
        })
      }).then(async res => {
        const message = await res.text()
        if (res.status === 200) {
          localStorage.setItem('token', message)
          this.$router.push('profile')
          this.$store.commit('LOGIN')
        } else {
          this.message = message
        }
      })
    }
  }
}
</script>