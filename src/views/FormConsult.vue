<template>
  <v-form ref="form" v-model="valid">
    <v-text-field :rules="[v => !!v || 'Nome do animal é obrigatório']" label="Nome do Animal" v-model="animal_name"></v-text-field>

    <v-select :rules="[v => !!v || 'Tipo de animal é obrigatório']" :items="['Cão', 'Gato']" label="Tipo de Animal" v-model="animal_type"></v-select>

    <v-text-field :rules="[v => !!v || 'Idade do animal é obrigatória']" label="Idade" type="number" v-model="age"></v-text-field>

    <v-textarea label="Sintomas" v-model="symptoms"></v-textarea>

    <v-text-field :rules="[v => !!v || 'Data é obrigatórios']" label="Data" type="date" v-model="date"></v-text-field>

    <v-select :rules="[v => !!v || 'Turno é obrigatório']" :items="['Manhã', 'Tarde']" label="Manhã/Tarde" v-model="time_of_day"></v-select>

    <v-select v-if="storeAuth.user.type_user == 'receptionist'" :rules="[v => !!v || 'Selecione o dono do animal']" :items="storeUser.users.map(user => user.name)" label="Selecionar o dono do animal" v-model="user_name"></v-select>
    <v-btn color="primary" @click="submitForm">Salvar</v-btn>
  </v-form>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useStorConsult } from '@/stores/storeConsult';
import { useStoreUser } from '@/stores/storeUser';
import { useStoreAuth } from '@/stores/storeAuth';

const router = useRouter();
const storeConsult = useStorConsult();
const storeUser = useStoreUser();
const storeAuth = useStoreAuth();

onMounted(() => {
  storeUser.init();
});
  
const form = ref(null);
const valid = ref(false);
const animal_name = ref('');
const animal_type = ref('');
const age = ref(null);
const symptoms = ref('');
const date = ref(null);
const time_of_day = ref('');
const user_name = ref('');

const submitForm = () => {
  let user = storeUser.users.find(user => user.name === user_name.value);

  if (form.value.validate() && user) {
    const consult = {
      animal_name: animal_name.value,
      animal_type: animal_type.value,
      age: age.value,
      symptoms: symptoms.value,
      date: date.value,
      time_of_day: time_of_day.value,
      user_id: user.id
    }
    storeConsult.create(consult, router);
    return;
  }

  if (form.value.validate()) {
    const consult = {
      animal_name: animal_name.value,
      animal_type: animal_type.value,
      age: age.value,
      symptoms: symptoms.value,
      date: date.value,
      time_of_day: time_of_day.value,
    }
    storeConsult.create(consult, router);
  }
};
</script>
