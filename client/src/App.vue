<template>
  <v-app>
    <v-card flat style="height:100%;">
      <Navbar></Navbar>
      <Container></Container>
    </v-card>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Container from '@/components/Container.vue'

export default {
  components: {
    Navbar,
    Container
  }
}
</script>
