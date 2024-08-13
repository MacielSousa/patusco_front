<template>
  <v-app>
    <Navbar />

    <v-main>
      <div class="main-container pa-4 pt-6">
        <RouterView />
        <Snackbar />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
//  imports
import { onMounted } from 'vue';
import Navbar from '@/components/Layout/Navbar.vue';
import Snackbar from '@/components/Shared/Snackbar.vue';

onMounted(() => {
});
</script>

<style>
.v-navigation-drawer {
  height: 10rem !important;
  overflow-y: hidden;
}

.v-navigation-drawer__content {
  overflow-y: hidden !important;
}
.v-toolbar__content,
.main-container {
  max-width: 68rem;
  margin: 0 auto;
}

.v-toolbar-title__placeholder {
  overflow: visible !important;
}
.v-main {
  background-color: #e3f2fd;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 0.6rem;
}

::-webkit-scrollbar-track {
  background-color: #e3f2fd;
}

::-webkit-scrollbar-thumb {
  background: #1867c0;
  border-radius: 1rem;
}
</style>
