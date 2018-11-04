<template>
  <v-layout column align-center fill-height>
    <v-card id="card-content">
      <v-toolbar card>
        <v-spacer></v-spacer>
        <v-toolbar-title>Bienvenue sur le parlement numérique Emendare</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-alert :value="true" type="error" style="margin:0">
        <strong>Version alpha</strong> ouverte depuis le 16 Novembre 2018 uniquement pour les mails se terminant par @zenika.com<br>
        Pour participer au développement, vous pouvez rejoindre le channel <strong>#emendare</strong> sur le slack Zenika
      </v-alert>
      <v-layout column align-center>
        <div style="margin-top:2rem">
          <h1>Plateforme open source de rédaction de textes amendables</h1>
          <h2>Un amendement est une modification d'un texte, soumise au vote d'un groupe</h2>
          <v-btn block to="/explore" color="info">Découvrir Emendare</v-btn>
          <v-btn block to="/signup" color="success">Créer votre compte</v-btn>
        </div>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<style scoped>
#card-content {
  width: 100%;
  margin-top: -64px;
  height: calc(100% + 128px);
}
</style>