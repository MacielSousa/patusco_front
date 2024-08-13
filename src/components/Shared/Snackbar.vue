<template>
  <v-snackbar
    v-model="storeConsult.snackbar.show"
    :color="storeConsult.snackbar.color"
    location="top"
    timeout="2500"
    class="mt-4"
  >
    <span class="font-weight-bold">
      {{ storeConsult.snackbar.text }}
    </span>

    <template v-slot:actions>
      <v-btn variant="text" @click="storeConsult.snackbar.show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
//  imports
import { useStorConsult } from '@/stores/storeConsult';

// store
const storeConsult = useStorConsult();
</script>
