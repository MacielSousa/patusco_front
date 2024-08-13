<template>
  <div class="navbar">
    <v-app-bar color="primary" prominent>
      <v-toolbar-title class="font-weight-bold text-h5">{{storeAuth.user.name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="storeAuth.user.id">

        <div class="d-sm-block d-none pr-4">
          <v-btn v-if="storeAuth.user.type_user != 'common'" to="/roleconsults" variant="text" class="ml-2">Consultas</v-btn>
          <v-btn  v-if="storeAuth.user.type_user == 'common'" to="/" variant="text" class="ml-2">Consultas</v-btn>
          <v-btn v-if="storeAuth.user.type_user != 'doctor'" to="/tomark" class="ml-2" variant="text">Marcar</v-btn>
          <v-btn @click="dialog.logOut = true" class="ml-2" variant="text">Log out</v-btn>
        </div>

        <v-app-bar-nav-icon
          class="d-sm-none d-block"
          :icon="drawer ? 'mdi-close' : 'mdi-menu'"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="top" temporary>
      <v-list-item
        @click="handleClick(index)"
        v-for="(item, index) in items"
        :key="index"
        :value="item"
        active-color="primary"
        height="3rem"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>
  </div>

  <DialogLogOut v-if="dialog.logOut" v-model="dialog.logOut" />
</template>

<script setup>
//  imports
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import DialogLogOut from '@/components/Auth/DialogLogOut.vue';
import { useStoreAuth } from '@/stores/storeAuth';

// store
const storeAuth = useStoreAuth();

// router
const router = useRouter();

const drawer = ref(false);
const items = ref([
  {
    title: 'Marcar',
    icon: 'mdi-note-multiple',
    click() {
      router.push('/tomark');
    }
  },
  {
    title: 'Consults',
    icon: 'mdi-chart-bar',
    click() {
      router.push(storeAuth.user.type_user != 'common' ? '/roleconsults': '/');
    }
  },
  {
    title: 'Log Out',
    icon: 'mdi-logout',
    click() {
      dialog.logOut = true;
    }
  }
]);

const handleClick = index => {
  items.value[index].click();
  drawer.value = false;
};

const dialog = reactive({
  logOut: false
});
</script>
