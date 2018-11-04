<template>
  <v-layout column align-center fill-height>
    <v-card class="card-content">
      <v-toolbar card>
        <v-spacer></v-spacer>
        <v-toolbar-title>Chargement en cours ... Veuillez patienter ...</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout column align-center justify-center>
        <v-progress-circular indeterminate color="primary" :size="128" :width="8">
          Chargement
        </v-progress-circular>
      </v-layout>
    </v-card>
  </v-layout>
</template>