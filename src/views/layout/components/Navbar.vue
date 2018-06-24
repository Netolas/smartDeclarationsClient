<template>
  <nav class="navbar is-fixed-top is-white" role="navigation" aria-label="main navigation">
    <div class="navbar-start">
      <a class="navbar-item" @click="toggleSideBar()">
        <span><b-icon
                pack="fas"
                icon="bars"
                size="is-small">
            </b-icon></span>
      </a>
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="@/assets/logo.png" alt="">
          <p class="is-title is-2">Declaraciones Inteligentes -  AngelHack 2018</p>
        </div>
      </div>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Acciones
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" @click="logout">
              Salir
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
      console.log(this.sidebar.opened)
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style scoped>
</style>
