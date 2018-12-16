<template>
  <v-layout column align-center fill-height>
    <v-card class="card-content">
      <v-toolbar card>
        <v-spacer></v-spacer>
        <v-toolbar-title>Erreur 404 - Page inexistante</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout column align-center justify-center>
        <h1 style="margin-top:2rem">Oups cette page n'existe pas ou plus</h1>
        <v-btn to="/" exact color="success">Retour à l'accueil</v-btn>
      </v-layout>
    </v-card>
  </v-layout>
</template>