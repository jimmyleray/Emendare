<template>
  <v-layout column align-center fill-height>
    <v-card class="card-content" v-if="group">

      <v-toolbar card>
        <v-tooltip bottom v-if="group.parent">
          <v-icon slot="activator" @click="$router.push('/group/' + group.parent._id)" class="fas fa-chevron-left"></v-icon>
          <span>Retour au groupe parent</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-toolbar-title v-if="group.parent">{{group.parent.name}} | <strong>{{group.name}}</strong></v-toolbar-title>
        <v-toolbar-title v-if="!group.parent">{{group.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom v-if="group.official">
          <v-icon slot="activator" color="primary" class="fas fa-globe-africa"></v-icon>
          <span>Groupe officiel</span>
        </v-tooltip>
        <v-tooltip bottom v-if="group.private">
          <v-icon slot="activator" color="error" class="fas fa-lock"></v-icon>
          <span>Groupe privé</span>
        </v-tooltip>
        <div v-if="user">
          <v-tooltip bottom v-if="user.followedGroups.find(id => id === group._id)">
            <v-btn @click="unFollowGroup()" slot="activator" icon>
              <v-icon color="warning" class="fas fa-star"></v-icon>
            </v-btn>
            <span>Ne plus suivre ce groupe</span>
          </v-tooltip>
          <v-tooltip bottom v-if="!user.followedGroups.find(id => id === group._id)">
            <v-btn @click="followGroup()" slot="activator" icon>
              <v-icon color="warning" class="far fa-star"></v-icon>
            </v-btn>
            <span>Suivre ce groupe</span>
          </v-tooltip>
        </div>
      </v-toolbar>

      <v-alert :value="true" type="info" color="blue-grey lighten-1" style="margin:0">
        Description : {{group.description}}<br>
        Crée le : {{new Date(group.created).toLocaleString()}}
      </v-alert>

      <v-list two-line subheader>
        <v-subheader v-if="group.subgroups.length > 0" inset>Groupes</v-subheader>

        <v-list-tile
          v-if="group.subgroups.length > 0"
          v-for="subgroup in group.subgroups"
          :key="subgroup._id"
          @click="$router.push('/group/' + subgroup._id)"
          avatar
        >
          <v-list-tile-avatar>
            <v-icon class="fas fa-users"></v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ subgroup.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ subgroup.description }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-tooltip bottom v-if="subgroup.official">
              <v-icon slot="activator" color="primary" class="fas fa-globe-africa"></v-icon>
              <span>Groupe officiel</span>
            </v-tooltip>
            <v-tooltip bottom v-if="subgroup.private">
              <v-icon slot="activator" color="error" class="fas fa-lock"></v-icon>
              <span>Groupe privé</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider v-if="group.subgroups.length > 0 && group.texts.length > 0" inset></v-divider>

        <v-subheader v-if="group.texts.length > 0" inset>Textes</v-subheader>

        <v-list-tile
          v-if="group.texts.length > 0"
          v-for="text in group.texts"
          :key="text._id"
          @click="$router.push('/text/' + text._id)"
          avatar
        >
          <v-list-tile-avatar>
            <v-icon class="fas fa-align-left"></v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ text.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ text.description }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-tooltip bottom v-if="text.official">
              <v-icon slot="activator" color="primary" class="fas fa-globe-africa"></v-icon>
              <span>Texte officiel</span>
            </v-tooltip>
            <v-tooltip bottom v-if="text.private">
              <v-icon slot="activator" color="error" class="fas fa-lock"></v-icon>
              <span>Texte privé</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
import { api, headers } from '../utils/api'

export default {
  data: function() {
    return {
      group: null,
      user: null
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    followGroup: function() {
      fetch(api('/user/followGroup/' + this.group._id), {
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
    unFollowGroup: function() {
      fetch(api('/user/unFollowGroup/' + this.group._id), {
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
      fetch(api('/groups/' + id), {
        method: 'get',
        headers: headers()
      }).then(async res => {
        if (res.status === 200) {
          const group = await res.json()
          this.group = group
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