<template>
  <v-layout column align-center fill-height>
    <v-card class="card-content">
      <v-toolbar card>
        <v-spacer></v-spacer>
        <v-toolbar-title>Mon profil</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout column align-center style="margin-top:3rem;">
        <div v-if="user">{{user.email}}</div>
        <v-btn color="error" @click="logout()">Déconnexion</v-btn>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
import { api, headers } from '../utils/api'

export default {
  data: () => ({
    user: null
  }),
  methods: {
    logout() {
      localStorage.removeItem('token')
      fetch(api('/logout'), {
        method: 'post',
        headers: headers(),
        body: JSON.stringify({
          token: localStorage.getItem('token')
        })
      })
      localStorage.removeItem('token')
      this.$store.commit('LOGOUT')
      this.$router.push('/')
    }
  },
  mounted: function() {
    fetch(api('/user'), {
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
        const user = await res.json()
        this.user = user
      }
    })
  }
}
</script>