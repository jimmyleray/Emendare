<template>
  <v-layout column align-center fill-height>
    <v-card id="card-content">
      <v-toolbar card>
        <v-spacer></v-spacer>
        <v-toolbar-title>Explorateur des contenus d'Emendare</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list two-line subheader>
        <v-subheader v-if="rootGroup.subgroups.length > 0" inset>Groupes</v-subheader>

        <v-list-tile
          v-if="rootGroup.subgroups.length > 0"
          v-for="subgroup in rootGroup.subgroups"
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

        <v-divider v-if="rootGroup.subgroups.length > 0 && rootGroup.texts.length > 0" inset></v-divider>

        <v-subheader v-if="rootGroup.texts.length > 0" inset>Textes</v-subheader>

        <v-list-tile
          v-if="rootGroup.texts.length > 0"
          v-for="text in rootGroup.texts"
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
  data: () => ({
    rootGroup: {}
  }),
  mounted: function() {
    fetch(api('/groups'), {
      method: 'get',
      headers: headers()
    }).then(async res => {
      if (res.status === 200) {
        const rootGroup = await res.json()
        this.rootGroup = rootGroup
      }
    })
  }
}
</script>