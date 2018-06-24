<template>
  <div class="app">
    <navbar></navbar>
    <section class="columns">
      <sidebar></sidebar>
      <app-main></app-main>
    </section>
    <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
  </div>
</template>

<script>
  import {Navbar, Sidebar, AppMain} from '@/views/layout/components'
import { mapGetters } from 'vuex';
  export default {
    name: 'layout',
    computed: mapGetters(['isLoading']),
    components: {
      Navbar, 
      Sidebar, 
      AppMain
    }
  }
</script>

<style scoped>
  .app {
    margin-top: 60px;
  }
</style>