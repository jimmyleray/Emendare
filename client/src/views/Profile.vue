<template>
  <v-layout column align-center>
    <h1>Profil</h1>
    <div>{{email}}</div>
    <v-btn color="error" @click="logout()">Déconnexion</v-btn>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    email: null
  }),
  methods: {
    logout() {
      fetch('http://localhost:3000/logout', {
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
          this.$store.commit('LOGOUT')
          this.$router.push('/')
        }
      })
    }
  },
  mounted: function() {
    fetch('http://localhost:3000/user/email', {
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