<template>
  <v-content>
    <v-container fluid>
      <v-fade-transition hide-on-leave>
        <router-view/>
      </v-fade-transition>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Container'
}
</script>
