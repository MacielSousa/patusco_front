<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5 d-flex align-center justify-space-between">
        Log Out?
        <v-icon @click="closeLogOutDialog" :size="22" color="grey" icon="mdi-close"></v-icon>
      </v-card-title>
      <v-divider />
      <v-card-text> Tem certeza de que deseja sair? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="closeLogOutDialog"> Cancelar </v-btn>
        <v-btn color="primary" variant="text" @click="logOut"> Sair </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
//  imports
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';
import { useRouter } from 'vue-router';
const router = useRouter();

// store
const storeAuth = useStoreAuth();

// props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits('update:modelValue');

const dialog = ref(true);

const logOut = () => {
  closeLogOutDialog();
  storeAuth.logOut(router);
};

const closeLogOutDialog = () => {
  emit('update:modelValue', false);
};
</script>
