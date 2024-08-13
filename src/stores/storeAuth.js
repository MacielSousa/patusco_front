import { defineStore } from 'pinia';
import { useStorConsult } from '@/stores/storeConsult';
import http from '@/services/http';

let storeConsult;
export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
      token: '', 
      userLoading: false,
      authBtnLoading: false
    };
  },
  actions: {
    async registerUser(credentials, router) {
      this.authBtnLoading = true;
      storeConsult = useStorConsult();
      try {
        const response = await http.post('/auth/register', credentials);
        storeConsult.showSnackbar('Registered successfully!', 'green-darken-1');
        this.user = response.data.user;
        localStorage.setItem('token', response.data.token);
        if(this.user.type_user != 'common') router.push('/roleconsults');
        router.push('/');
      } catch (error) {
        storeConsult.showSnackbar('Something went wrong!', 'red-darken-2');
      } finally {
        this.authBtnLoading = false;
      }
    },
    async validateToken(router) {
      this.authBtnLoading = true;
      storeConsult = useStorConsult();
      try {
          const token = localStorage.getItem('token');
          const response = await http.post('auth/validate-token', {}, {
            headers:{
              Authorization: `Bearer ${token}`
            }
          });
          this.user = response.data.user;
          if(this.user.type_user != 'common') return router.push('/roleconsults');
          router.push('/');
      } catch (error) {
        console.log('Erro Login:', error);
      } finally {
        this.authBtnLoading = false;
      }
    },
    async loginUser(credentials, router) {
      this.authBtnLoading = true;
      storeConsult = useStorConsult();
      try {
        const response = await http.post('/auth/login', credentials);
        storeConsult.showSnackbar('Logged in successfully!', 'green-darken-1');
        localStorage.setItem('token', response.data.token);
        this.user = response.data.user;
        if(this.user.type_user != 'common') return router.push('/roleconsults');
        router.push('/');
      } catch (error) {
        storeConsult.showSnackbar('User not found!', 'red-darken-2');
      } finally {
        this.authBtnLoading = false;
      }
    },
    logOut(router) {
      this.user = {};
      storeConsult = useStorConsult();
      localStorage.removeItem('token');
      storeConsult.showSnackbar('Logged out successfully!', 'green-darken-1');
      router.push('/auth');
    }
  }
  
});
