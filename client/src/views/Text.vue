<template>
  <v-layout column align-center fill-height>
    <v-card class="card-content" v-if="text">
      <v-toolbar card>
        <v-tooltip bottom v-if="text.group">
          <v-icon slot="activator" @click="$router.push('/group/' + text.group._id)" class="fas fa-chevron-left"></v-icon>
          <span>Retour au groupe</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{text.group.name}} | <strong>{{text.name}}</strong></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom v-if="text.official">
          <v-icon slot="activator" color="primary" class="fas fa-globe-africa"></v-icon>
          <span>Texte officiel</span>
        </v-tooltip>
        <v-tooltip bottom v-if="text.private">
          <v-icon slot="activator" color="error" class="fas fa-lock"></v-icon>
          <span>Texte privé</span>
        </v-tooltip>
        <div v-if="user">
          <v-tooltip bottom v-if="user.followedTexts.find(id => id === text._id)">
            <v-btn @click="unFollowText()" slot="activator" icon>
              <v-icon color="warning" class="fas fa-star"></v-icon>
            </v-btn>
            <span>Ne plus suivre ce texte</span>
          </v-tooltip>
          <v-tooltip bottom v-if="!user.followedTexts.find(id => id === text._id)">
            <v-btn @click="followText()" slot="activator" icon>
              <v-icon color="warning" class="far fa-star"></v-icon>
            </v-btn>
            <span>Suivre ce texte</span>
          </v-tooltip>
        </div>
      </v-toolbar>
      
      <v-alert :value="true" type="info" color="blue-grey lighten-1" style="margin:0">
        Description : {{text.description}}<br>
        Crée le : {{new Date(text.created).toLocaleString()}}
      </v-alert>

      <v-card-title>
        <div v-html="computedText"></div>
      </v-card-title>
    </v-card>
  </v-layout>
</template>

<script>
import * as marked from 'marked'
import { api, headers } from '../utils/api'

export default {
  data: function() {
    return {
      text: null,
      user: null
    }
  },
  computed: {
    computedText() {
      return marked.default(this.text.actual, { sanitize: true })
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    followText: function() {
      fetch(api('/user/followText/' + this.text._id), {
        method: 'post',
        headers: headers(),
        body: JSON.stringify({
          token: localStorage.getItem('token')
        })
      }).then(async res => {
        if (res.status === 200) {
          const user = await res.json()
          this.user = user
        }
      })
    },
    unFollowText: function() {
      fetch(api('/user/unFollowText/' + this.text._id), {
        method: 'post',
        headers: headers(),
        body: JSON.stringify({
          token: localStorage.getItem('token')
        })
      }).then(async res => {
        if (res.status === 200) {
          const user = await res.json()
          this.user = user
        }
      })
    },
    fetchData: function(id) {
      fetch(api('/text/' + id), {
        method: 'get',
        headers: headers()
      }).then(async res => {
        if (res.status === 200) {
          const text = await res.json()
          this.text = text
        }
      })
      if (this.isLoggedIn) {
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
  },
  watch: {
    '$route.params.id': function(id) {
      this.fetchData(id)
    }
  },
  mounted: function() {
    this.fetchData(this.$route.params.id)
  }
}
</script>