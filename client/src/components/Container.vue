<template>
  <v-content style="height:calc(100% - 128px);">
    <v-container id="content" style="height:100%;">
      <v-fade-transition hide-on-leave>
        <router-view v-if="!isPending"/>
        <Pending v-if="isPending"></Pending>
      </v-fade-transition>
    </v-container>
  </v-content>
</template>

<style scoped>
#content {
  max-width: 960px;
  padding-top: 0px;
  padding-bottom: 0px;
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