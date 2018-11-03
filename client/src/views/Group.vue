<template>
  <v-layout column align-center>
    <v-card id="card-content">
      <v-toolbar color="teal" dark>
        <v-icon v-if="group.parent" @click="$router.push('/group/' + group.parent._id)" class="fas fa-chevron-left"></v-icon>
        <v-toolbar-title v-if="group.parent">{{group.parent.name}} \ <strong>{{group.name}}</strong></v-toolbar-title>
        <v-toolbar-title v-if="!group.parent">{{group.name}}</v-toolbar-title>
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
            <v-btn icon v-if="subgroup.private">
              <v-icon class="fas fa-user-lock"></v-icon>
            </v-btn>
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
            <v-btn icon v-if="text.private">
              <v-icon class="fas fa-user-lock"></v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-layout>
</template>

<style scoped>
#card-content {
  width: 100%;
}
</style>

<script>
import { api, headers } from '../utils/api'

export default {
  data: function() {
    return {
      group: {}
    }
  },
  methods: {
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