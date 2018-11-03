<template>
  <v-layout column align-center>
    <h1>Profil</h1>
    <div>{{email}}</div>
    <v-btn color="error" @click="logout()">Déconnexion</v-btn>
  </v-layout>
</template>

<script>
import { api, headers } from '../utils/api'

export default {
  data: () => ({
    email: null
  }),
  methods: {
    logout() {
      fetch(api('/logout'), {
        method: 'post',
        headers: headers(),
        body: JSON.stringify({
          token: localStorage.getItem('token')
        })
      }).then(async res => {
        if (res.status === 200) {
          localStorage.removeItem('token')
          this.$store.commit('LOGOUT')
          this.$router.push('/')
        }
      })
    }
  },
  mounted: function() {
    fetch(api('/user/email'), {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    }).then(async res => {
      if (res.status === 200) {
        const email = await res.text()
        this.email = email
      }
    })
  }
}
</script>