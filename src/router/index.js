import { createRouter, createWebHashHistory } from 'vue-router';

import FormAuth from '@/views/FormAuth';
import FormConsult from '@/views/FormConsult';
import ListConsults from '@/views/ListConsults';
import ListConsultsRole from '@/views/ListConsultsRole';
import ViewPageNotFound from '@/views/ViewPageNotFound';
import { useStoreAuth } from '@/stores/storeAuth';

let storeAuth;

const routes = [
  {
    path: '/tomark',
    name: 'Consult',
    component: FormConsult
  },
  {
    path: '/roleconsults',
    name: 'roleconsults',
    component: ListConsultsRole
  },
  {
    path: '/',
    name: 'consults',
    component: ListConsults
  },
  {
    path: '/auth',
    name: 'auth',
    component: FormAuth
  },
  {
    path: '/:catchAll(.*)',
    name: 'page-not-found',
    component: ViewPageNotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async to => {
  storeAuth = useStoreAuth();

  if (!storeAuth.user.id && to.name !== 'auth') {
    return { name: 'auth' };
  }

  if (storeAuth.user.id && to.name === 'auth') {
    return false;
  }
});

export default router;
