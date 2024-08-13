import { defineStore } from 'pinia';
import http from '@/services/http';
import { useStoreAuth } from '@/stores/storeAuth';

let storeAuth;

export const useStorConsult = defineStore('storeConsult', {
  state: () => ({
    consults: [],
    doctors: [],
    consultsData: [],
    loading: false,
    snackbar: {
      show: false,
      text: '',
      color: ''
    }
  }),
  actions: {
    init() {
      storeAuth = useStoreAuth();
      if(storeAuth.user.type_user != 'common')
      {
        this.filters('');
      }
      if(storeAuth.user.type_user == 'common')
      {
        this.getConsults();
      }
      if(storeAuth.user.type_user == 'receptionist')
      {
        this.getDoctors();
      }
      
    },
    async getConsults() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await http.get('/consult/list', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        this.consults = response.data.data.consults.map(consult => ({
          id: consult.id,
          animal_type: consult.animal_type,
          animal_name: consult.animal_name,
          age: consult.age,
          symptoms: consult.symptoms,
          date: consult.date,
          time_of_day: consult.time_of_day,
          user_id: consult.user_id,
          doctor_id: consult.doctor_id,
          receptionist_id: consult.receptionist_id
        }));
      } catch (error) {
        console.error('Erro ao buscar Consultas:', error);
        this.consults = [];
      } finally {
        this.loading = false;
      }
    },
    async filters(optionsFilter) {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await http.get(`/consult/filter${optionsFilter}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        this.consultsData = response.data.data.consults;
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
        this.consultsData = [];
      } finally {
        this.loading = false;
      }
    },
    async getDoctors() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await http.get(`/consult/getDoctors`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        this.doctors = response.data.data.doctors;
      } catch (error) {
        console.error('Erro ao listar medicos!:', error);
        this.doctors = [];
      } finally {
        this.loading = false;
      }
    },
    async assignDoctor(consult_id, doctor_id){
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        await http.post(`/consult/assign/consult/${consult_id}/doctor/${doctor_id}`, {}, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        this.filters('');
        this.getDoctors();
      } catch (error) {
        console.error('Erro ao atribuir consultar para medico!:', error);
      } finally {
        this.loading = false;
      }
    },
    async create(consult, router) {
      try {
        const token = localStorage.getItem('token');
        const response = await http.post('/consult/register', consult, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        this.showSnackbar('Consulta cadastrada realizado com sucesso!', 'green-darken-1');
        if(storeAuth.user.type_user != 'common')
        {
          this.filters('');
        }
        
        if(storeAuth.user.type_user == 'common')
        {
          this.getConsults();
        }

        if(storeAuth.user.type_user != 'common') return router.push('/roleconsults');
        router.push('/');
      } catch (error) {
        console.log('Erro ao adicionar nota:', error);
      }
    },
    async deleteConsult(id) {
      try {
        const token = localStorage.getItem('token');
        const response = await http.delete(`/consult/delete/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        this.filters('');
        this.getConsults();
      } catch (error) {
        console.error('Erro ao deletar nota:', error);
      }
    },
    async update(consult, router) {
      try {
        const token = localStorage.getItem('token');
        const response = await http.put(`/consult/update/${consult.id}`, consult, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        this.showSnackbar('Consulta cadastrada realizado com sucesso!', 'green-darken-1');
        this.getConsults();
        this.filters('');
        if(this.user.type_user != 'common') return router.push('/roleconsults');
        router.push('/');
      } catch (error) {
        console.error('Erro ao atualizar nota:', error);
      }
    },
    showSnackbar(text, color) {
      let timeout = 0;

      if (this.snackbar.show) {
        this.snackbar.show = false;
        timeout = 300;
      }

      setTimeout(() => {
        this.snackbar.show = true;
        this.snackbar.text = text;
        this.snackbar.color = color;
      }, timeout);
    }
  },
});