<template>
  <div class="stats">
    <v-table class="elevation-1 rounded">
      <thead>
        <tr>
          <th class="text-left font-weight-bold">Nome</th>
          <th class="text-left font-weight-bold">Data</th>
          <th class="text-left font-weight-bold">Periodo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="consult in storeConsult.consults" :key="consult.id">
          <td>{{consult.animal_name}}</td>
          <td>{{ format(new Date(consult.date), 'dd/MM/yyyy') }}</td>
          <td>{{consult.time_of_day}}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { useStorConsult } from '@/stores/storeConsult';
import { onMounted } from 'vue';

const storeConsult = useStorConsult();

onMounted(() => {
  storeConsult.init();
});
</script>
