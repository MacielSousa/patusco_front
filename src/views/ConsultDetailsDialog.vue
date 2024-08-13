<template>
    <v-dialog v-model="dialog" persistent min-width="200px" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 d-flex align-center justify-space-between">
          Detalhes da Consulta
          <v-icon @click="closeDialog" :size="22" color="grey" icon="mdi-close"></v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>ID:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.id }}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nome do Animal:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.animal_name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Tipo de Animal:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.animal_type }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Idade:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.age }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Sintomas:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.symptoms }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Data:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.date }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Período do Dia:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.time_of_day }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nome do Usuário:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.user_name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Email do Usuário:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.user_email }}</v-list-item-subtitle>
               </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Médico:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.doctor_name }}</v-list-item-subtitle>
              </v-list-item-content>  
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Email do Médico:</v-list-item-title>
                <v-list-item-subtitle>{{ consult.doctor_email }}</v-list-item-subtitle>
               </v-list-item-content>   
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDialog"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script setup>
  import { ref, defineProps, defineEmits, watchEffect } from 'vue';
  
  const props = defineProps({
    modelValue: Boolean,
    consult: Object
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const dialog = ref(props.modelValue);
  
  watchEffect(() => {
    dialog.value = props.modelValue;
  });
  
  const closeDialog = () => {
    emit('update:modelValue', false);
  };
  </script>

<style scoped>
.v-list-item-title {
  font-weight: bold;
}
</style>