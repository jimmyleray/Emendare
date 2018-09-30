<template>
  <v-app>
    <Navbar></Navbar>
    <Container></Container>
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
