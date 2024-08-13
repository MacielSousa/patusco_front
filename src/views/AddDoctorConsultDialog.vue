<template>
    <v-dialog v-model="dialog" persistent min-width="200px" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 d-flex align-center justify-space-between">
          Atribuir Médico
          <v-icon @click="closeDialog" :size="22" color="grey" icon="mdi-close"></v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select 
              :rules="[v => !!v || 'Médico é obrigatório']" 
              :items="storeConsult.doctors.map(doctor => doctor.label)" label="Selecione um Médico" 
              v-model="selectedDoctor">
            </v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="assignDoctor">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watchEffect, onMounted } from 'vue';
  import { useStorConsult } from '@/stores/storeConsult';
  import { useRouter } from 'vue-router';
  import { useStoreAuth } from '@/stores/storeAuth';
  
  const props = defineProps({
    modelValue: Boolean,
    consultId: Object
  });

  
  const emit = defineEmits(['update:modelValue']);
  const storeAuth = useStoreAuth();
  const storeConsult = useStorConsult();
  const router = useRouter();

  onMounted(() => {
    storeConsult.init();
  });
  
const selectedDoctor = ref(''); // Médico selecionado
  
  const dialog = ref(props.modelValue);
  const valid = ref(true);
  const form = ref(null);
  
  watchEffect(() => {
    dialog.value = props.modelValue;
  });
  
  const closeDialog = () => {
    emit('update:modelValue', false);
  };
  
  function assignDoctor() {
    if (form.value.validate()) {
       let doctor = storeConsult.doctors.find(doctor => doctor.label === selectedDoctor.value);
       storeConsult.assignDoctor(props.consultId, doctor.value);
       closeDialog();
    };
    }
  </script>
  
  <style scoped>
  .v-btn {
    margin: 0 8px;
  }
  </style>
  