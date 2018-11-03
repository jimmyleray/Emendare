<template>
  <v-layout column align-center class="text-xs-center">
    <div class="pa-4">
      <h1>Plateforme open source de rédaction de textes amendables</h1>
      <h2>Un amendement est une modification d'un texte, soumise au vote d'un groupe</h2>
      <v-alert :value="true" type="info">
        <strong>Version alpha</strong> ouverte depuis le 16 Novembre 2018 uniquement pour les mails *@zenika.com<br>
        Pour participer au développement vous pouvez rejoindre le channel Slack <strong>#emendare</strong>
      </v-alert>
      <v-btn block to="/explore" color="error">Découvrir Emendare</v-btn>
      <v-btn block to="/signup" color="success">Créer votre compte</v-btn>
    </div>
  </v-layout>
</template>
