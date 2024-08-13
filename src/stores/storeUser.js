import { defineStore } from 'pinia';
import http from '@/services/http';
import { useStoreAuth } from '@/stores/storeAuth';

let storeAuth;

export const useStoreUser = defineStore('storeUser', {
  state: () => ({
    users: [],
  }),
  actions: {
    init() {
      storeAuth = useStoreAuth();
      if(storeAuth.user.type_user != 'common')
      {
        this.getUsers();
      }
    },
    async getUsers() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await http.get('/user/list', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        console.log('User List:', response);
        this.users = response.data;
        console.log(this.users);
      } catch (error) {
        console.error('Erro ao buscar User:', error);
        this.users = [];
      } finally {
        this.loading = false;
      }
    },
  },
});