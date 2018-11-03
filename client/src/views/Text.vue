<template>
  <v-layout column align-center>
    <v-card id="card-content">
      <v-toolbar color="teal" dark>
        <v-icon v-if="text.group" @click="$router.push('/group/' + text.group._id)" class="fas fa-chevron-left"></v-icon>
        <v-toolbar-title>{{text.group.name}} \ <strong>{{text.name}}</strong></v-toolbar-title>
      </v-toolbar>
      <v-card-title primary-title>
        <div class="headline">{{text.description}}</div>
        <div>{{text.actual}}</div>
      </v-card-title>
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
      text: {}
    }
  },
  methods: {
    fetchData: function(id) {
      fetch(api('/texts/' + id), {
        method: 'get',
        headers: headers()
      }).then(async res => {
        if (res.status === 200) {
          const text = await res.json()
          this.text = text
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