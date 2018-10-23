<template>
  <v-layout column align-center>
    <h1>Inscription</h1>
    <v-form id="signUpForm" v-model="valid">
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
      <v-btn block @click="signup(email, password)" color="success" :disabled="!valid">Inscription</v-btn>
    <v-alert :value="true" v-if="message" type="error" transition="scale-transition">{{message}}</v-alert>
    </v-form>
  </v-layout>
</template>

<style scoped>
#signUpForm {
  width: 100%;
  max-width: 350px;
}
</style>


<script>
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
    passwordRules: [
      v => !!v || 'Le mot de passe est requis',
      v => v.length > 8 || 'Le mot de passe doit contenir au moins 8 caractères'
    ]
  }),
  methods: {
    signup: function(email, password) {
      fetch('http://localhost:3000/signup', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          email
        })
      }).then(async res => {
        this.message = await res.text()
        if (res.status === 200) {
          this.$router.push('/signin')
        }
      })
    }
  }
}
</script>