<template>
  <v-content>
    <v-container id="content" fill-height>
      <v-fade-transition hide-on-leave>
        <router-view v-if="!isPending"/>
        <Pending v-if="isPending"></Pending>
      </v-fade-transition>
    </v-container>
  </v-content>
</template>
    max-width: 900px;

<style scoped>
#content {
  max-width: 960px;
}
</style>

<script>
import Pending from '@/views/Pending.vue'

export default {
  components: {
    Pending
  },
  computed: {
    isPending() {
      return this.$store.getters.isPending
    }
  }
}
</script>