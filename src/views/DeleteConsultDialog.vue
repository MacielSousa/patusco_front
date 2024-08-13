<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5 d-flex align-center justify-space-between">
        Excluir Consulta?
        <v-icon @click="closeDeleteDialog" :size="22" color="grey" icon="mdi-close"></v-icon>
      </v-card-title>
      <v-divider />
      <v-card-text> Tem certeza de que deseja excluir esta consulta? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="closeDeleteDialog"> Cancelar </v-btn>
        <v-btn color="error" variant="text" @click="deleteConsult"> Excluir </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useStorConsult } from '@/stores/storeConsult';
import { useRouter } from 'vue-router';

const router = useRouter();
const storeConsult = useStorConsult();

const props = defineProps({
  modelValue: Boolean,
  consultId: Number
});

const emit = defineEmits('update:modelValue');

const dialog = ref(props.modelValue);

watchEffect(() => {
  dialog.value = props.modelValue;
});

const deleteConsult = () => {
  storeConsult.deleteConsult(props.consultId);
  closeDeleteDialog();
};

const closeDeleteDialog = () => {
  emit('update:modelValue', false);
};
</script>


<style scoped>
.v-btn {
  margin: 0 8px;
}
</style>
