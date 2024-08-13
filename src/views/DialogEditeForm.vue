<template>
  <div>
    <!-- Botão para abrir o diálogo -->
    <v-btn color="primary" @click="dialogOpen.value = true">Editar Consulta</v-btn>

    <!-- Diálogo que contém o formulário -->
    <v-dialog v-model="dialogOpen.value" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Consulta</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <!-- O formulário aqui -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogOpen.value = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="submitForm">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStorConsult } from '@/stores/storeConsult';

const storeConsult = useStorConsult();

// Variáveis reativas para controle do formulário e diálogo
const valid = ref(false);
const dialogOpen = ref(false);
const animal_name = ref('');
const animal_type = ref('');
const age = ref(null);
const symptoms = ref('');
const date = ref(null);
const time_of_day = ref('');

// Exemplo de função para abrir o diálogo com dados da consulta
function openDialog(consultData) {
  // Atualiza os campos do formulário com os dados da consulta
  animal_name.value = consultData.animal_name;
  animal_type.value = consultData.animal_type;
  age.value = consultData.age;
  symptoms.value = consultData.symptoms;
  date.value = consultData.date;
  time_of_day.value = consultData.time_of_day;

  // Abre o diálogo
  dialogOpen.value = true;
}

const submitForm = () => {
  const consult = {
    animal_name: animal_name.value,
    animal_type: animal_type.value,
    age: age.value,
    symptoms: symptoms.value,
    date: date.value,
    time_of_day: time_of_day.value
  };

  // Aqui você chamaria uma função para atualizar a consulta existente
  // Por exemplo: storeConsult.update(consult);
  
  console.log(consult);
  dialogOpen.value = false;
};
</script>