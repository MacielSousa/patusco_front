<template>
  <div class="stats">
    <div class="filters mb-4">
      <v-text-field
        label="Data (dd/MM/yyyy)"
        v-model="filterDate"
        type="date"
        class="mr-2"
      ></v-text-field>
      <v-select
        :items="['Cão', 'Gato']"
        label="Tipo de Animal"
        v-model="filterAnimalType"
        class="mr-2"
      ></v-select>
      <v-btn @click="applyFilters" color="primary" class="mr-2">Buscar</v-btn>
      <v-btn @click="clearFilters" color="error">Limpar Filtros</v-btn>
    </div>

    <v-table class="elevation-1 rounded">
      <thead>
        <tr>
          <th class="text-left font-weight-bold">ID</th>
          <th class="text-left font-weight-bold">Nome</th>
          <th class="text-left font-weight-bold">Data</th>
          <th class="text-left font-weight-bold">Periodo</th>
          <th class="text-left font-weight-bold">Cuidador</th>
          <th class="text-left font-weight-bold">Tipo</th>
          <th class="text-left font-weight-bold">Medico</th>
          <th class="text-left font-weight-bold"></th>
          <th class="text-left font-weight-bold"></th>
          <th v-if="storeAuth.user.type_user == 'receptionist'" class="text-left font-weight-bold"></th>
          <th v-if="storeAuth.user.type_user == 'receptionist'" class="text-left font-weight-bold"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="consult in storeConsult.consultsData" :key="consult.id">
          <td>{{consult.id}}</td>
          <td>{{consult.animal_name}}</td>
          <td>{{ format(new Date(consult.date), 'dd/MM/yyyy') }}</td>
          <td>{{consult.time_of_day}}</td>
          <td>{{consult.user_name}}</td>
          <td>{{consult.animal_type}}</td>
          <td>{{consult.doctor_name}}</td>
          <td>
            <v-btn @click="openEditDialog(consult)" class="ml-2" variant="text">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn @click="openConsultDetails(consult)" class="ml-2" variant="text">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </td>
          <td v-if="storeAuth.user.type_user == 'receptionist'">
            <v-btn @click="openDeleteDialog(consult.id)" class="ml-2" variant="text">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
          <td v-if="storeAuth.user.type_user == 'receptionist'">
            <v-btn @click="openAddDoctor(consult.id)" class="ml-2" variant="text">
              <v-icon>Atribuir</v-icon>
              Atribuir
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <ConsultDetailsDialog v-model="showDialog" :consult="selectedConsult" />
    <ConsultEditDialog v-model="editDialog" :consult="selectedConsultEdit" />
    <AddDoctorConsultDialog v-model="showAddDoctor" :consultId="consultId" />
    <DeleteConsultDialog v-model="deleteDialog" :consultId="selectedConsultId" />
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { useStorConsult } from '@/stores/storeConsult';
import { onMounted, ref } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';
import ConsultDetailsDialog from './ConsultDetailsDialog.vue';
import ConsultEditDialog from './ConsultEditDialog.vue';
import AddDoctorConsultDialog from './AddDoctorConsultDialog.vue';
import DeleteConsultDialog  from './DeleteConsultDialog.vue';

const editDialog = ref(false);
const selectedConsultEdit = ref(null);

const storeConsult = useStorConsult();

const storeAuth = useStoreAuth();

const showDialog = ref(false);
const selectedConsult = ref(null);

const showAddDoctor = ref(false);
const consultId = ref('')

const deleteDialog = ref(false);
const selectedConsultId = ref(null);

// Refs para os filtros
const filterDate = ref(null);
const filterAnimalType = ref(null);

function openConsultDetails(consult) {
  selectedConsult.value = consult;
  showDialog.value = true;
}

function openEditDialog(consult) {
  selectedConsultEdit.value = consult;
  editDialog.value = true;
}

function openAddDoctor(consult_id){
  consultId.value = consult_id;
  showAddDoctor.value = true;
}

function openDeleteDialog(consultId) {
  selectedConsultId.value = consultId;
  deleteDialog.value = true;
}

const applyFilters = () => {
  let baseUrl = '?';
  if(filterAnimalType.value) baseUrl = baseUrl+'animal_type='+filterAnimalType.value+'&';
  if(filterDate.value) baseUrl = baseUrl+'date='+filterDate.value;
  console.log('Base URL: ', baseUrl);
  storeConsult.filters(baseUrl);
};

const clearFilters = () => {
  console.log(filterDate.value, filterAnimalType.value);
  filterDate.value = null;
  filterAnimalType.value = null;
};

onMounted(() => {
  storeConsult.init();
});

</script>
