<template>
    <v-dialog v-model="dialog" persistent min-width="200px" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 d-flex align-center justify-space-between">
          Editar Consulta
          <v-icon @click="closeDialog" :size="22" color="grey" icon="mdi-close"></v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="Nome do Animal"
              v-model="consult.animal_name"
              :rules="[v => !!v || 'Nome do animal é obrigatório']"
              required
            ></v-text-field>
            <v-select 
                :rules="[v => !!v || 'Tipo de animal é obrigatório']" 
                :items="['Cão', 'Gato']" label="Tipo de Animal" 
                v-model="consult.animal_type">
            </v-select>
            <v-text-field
              label="Idade"
              v-model="consult.age"
              type="number"
              :rules="[v => !!v || 'Idade é obrigatória']"
              required
            ></v-text-field>
            <v-select  
                :rules="[v => !!v || 'Turno é obrigatório']" 
                :items="['Manhã', 'Tarde']" label="Manhã/Tarde" 
                v-model="consult.time_of_day">
            </v-select>
            <v-text-field
                :rules="[v => !!v || 'Data é obrigatórios']"
                 label="Data"
                 type="date"
                 v-model="formattedDate">
            </v-text-field>
            <v-textarea
              label="Sintomas"
              v-model="consult.symptoms"
              :rules="[v => !!v || 'Sintomas são obrigatórios']"
              required
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="saveChanges(consult)">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script setup>
import { ref, defineProps, defineEmits, watchEffect, reactive } from 'vue';
import { useStorConsult } from '@/stores/storeConsult';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';
import { useStoreAuth } from '@/stores/storeAuth';

// v-if="storeAuth.user.type_user == 'receptionist'"
const props = defineProps({
  modelValue: Boolean,
  consult: Object
});

const emit = defineEmits(['update:modelValue']);
const storeAuth = useStoreAuth();
const storeConsult = useStorConsult();
const router = useRouter();


const editedConsult = reactive({ ...props.consult });

const dialog = ref(props.modelValue);
const valid = ref(true);
const form = ref(null);
const formattedDate = ref('');

watchEffect(() => {
  dialog.value = props.modelValue;
  if (props.modelValue && props.consult && props.consult.date) 
  {
    formattedDate.value = format(new Date(props.consult.date), 'yyyy-MM-dd');
  }
  
});

const closeDialog = () => {
  emit('update:modelValue', false);
};

function saveChanges(consult) {
  if (form.value.validate()) {
    consult.date = formattedDate;
    console.log('Salvando alterações', consult);
    storeConsult.update(consult, router);
    closeDialog();
  };
}
</script>

<style scoped>
.v-btn {
  margin: 0 8px;
}
</style>
