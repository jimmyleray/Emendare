<template>
  <v-app>
    <v-card flat style="height:100%;" color="blue-grey lighten-4">
      <Navbar></Navbar>
      <Container></Container>
    </v-card>
  </v-app>
</template>

<script>
import Navbar from '@/components/templates/Navbar'
import Container from '@/components/templates/Container'

export default {
  components: {
    Navbar,
    Container
  }
}
</script>
