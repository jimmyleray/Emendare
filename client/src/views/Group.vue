<template>
  <v-layout column align-center fill-height>
    <v-card id="card-content" v-if="group">

      <v-toolbar card>
        <v-icon v-if="group.parent" @click="$router.push('/group/' + group.parent._id)" class="fas fa-chevron-left"></v-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title v-if="group.parent">{{group.parent.name}} | <strong>{{group.name}}</strong></v-toolbar-title>
        <v-toolbar-title v-if="!group.parent">{{group.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="user">
          <v-tooltip bottom v-if="user.followedGroups.find(id => id === group._id)">
            <v-btn @click="unFollowGroup()" slot="activator" icon>
              <v-icon class="fas fa-star"></v-icon>
            </v-btn>
            <span>Ne plus suivre ce groupe</span>
          </v-tooltip>
          <v-tooltip bottom v-if="!user.followedGroups.find(id => id === group._id)">
            <v-btn @click="followGroup()" slot="activator" icon>
              <v-icon class="far fa-star"></v-icon>
            </v-btn>
            <span>Suivre ce groupe</span>
          </v-tooltip>
        </div>
      </v-toolbar>

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
            <v-icon v-if="subgroup.private" class="fas fa-lock"></v-icon>
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
            <v-icon v-if="text.private" class="fas fa-lock"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-layout>
</template>

<style scoped>
#card-content {
  width: 100%;
  margin-top: -64px;
  height: calc(100% + 128px);
}
</style>

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