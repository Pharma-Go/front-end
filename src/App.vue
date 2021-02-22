<template>
  <pg-app id="app">
    <router-view />
    
    <pg-bottom-bar
      v-if="$route.meta.bottomBar"
      :activeRoute="$route.name"
    ></pg-bottom-bar>
  </pg-app>
</template>