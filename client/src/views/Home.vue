<template>
  <v-layout column align-center class="text-xs-center">
    <div class="pa-4">
      <h1>Le Parlement numérique</h1>
      <h2>Plateforme open source avec une gestion communautaire et démocratique de textes amendables</h2>
      <span>Un amendement est une modification, soumise au vote d'une assemblée, en vue de corriger, compléter ou annuler tout ou une partie d'un projet de texte</span>
    </div>
    <div>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-layout column align-center class="pa-5">
            <v-icon x-large color="primary">fas fa-edit</v-icon>
            <h3>Editeur avancé d'amendements</h3>
            <span>Les utilisateurs peuvent proposer des modifications sur les textes publics ou ceux de leurs organisations</span>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4>
          <v-layout column align-center class="pa-5">
            <v-icon x-large color="primary">fas fa-users</v-icon>
            <h3>Gestion de groupes de réflexion</h3>
            <span>Les organisations peuvent gérer finement et collectivement leurs propres règles d'administration</span>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4>
          <v-layout column align-center class="pa-5">
            <v-icon x-large color="primary">fas fa-chart-pie</v-icon>
            <h3>Organisation des votes</h3>
            <span>Les votes sur les propositions des utilisateurs sont organisés et appliqués automatiquement</span>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-layout column align-center class="pa-5">
            <h3>Entreprises & coopératives</h3>
            <span>Rédigez horizontalement des textes liés à vos activités professionnelles</span>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4>
          <v-layout column align-center class="pa-5">
            <h3>Partis politiques & syndicats</h3>
            <span>Rédigez vos programmes politiques et vos revendications</span>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4>
          <v-layout column align-center class="pa-5">
            <h3>Groupes & associations</h3>
            <span>Rédigez collectivement vos rapports de discussions ou vos pétitions</span>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </v-layout>
</template>
