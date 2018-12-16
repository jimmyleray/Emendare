<template>
  <v-layout column align-center fill-height>
    <v-card class="card-content" v-if="rootGroup">
      <v-toolbar card>
        <v-spacer></v-spacer>
        <v-toolbar-title>Explorateur des contenus d'Emendare</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-alert :value="true" type="info" color="blue-grey lighten-1" style="margin:0">
        Description : {{rootGroup.description}}
        <br>
        Crée le : {{new Date(rootGroup.created).toLocaleString()}}
      </v-alert>

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
import { api, headers } from '@/services/api'

export default {
  data: () => ({
    rootGroup: null
  }),
  mounted: function() {
    fetch(api('/rootGroup'), {
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