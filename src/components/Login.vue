<template>
  <section class="hero is-fullheight is-desktop login">
    <div class="hero-body">
    <div class="card op9">
      <div class="card-content is-horizontal-center has-text-centered">
        <figure class='image is-flex is-128x128 has-image-centered'>
          <img src="@/assets/logo.png">
        </figure>
        <p class="title">Declaraciones Inteligentes</p>
          <b-field label="Usuario">
            <b-input v-model="loginForm.username"></b-input>
          </b-field>
          <b-field label="Contraseña">
            <b-input v-model="loginForm.password" type="password"></b-input>
          </b-field>
          <button class="button is-primary is-fullwidth" @click="handleLogin()">Acceder</button>
      </div>
    </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "login",
  computed: mapGetters(["isLoading"]),
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    handleLogin: function() {
      this.loading = true
      this.$store.dispatch('Login', this.loginForm).then(() => {
        this.loading = false
        this.$router.push({ path: '/' })
      }).catch(() => {
        this.loading = false
      })
    }
  }
};
</script>

<style scoped>
.login {
  background-image: url(http://www.hdfondos.eu/pictures/2015/1222/1/blue-gradients-background-665033.jpg);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
  align-items: center;
}
.op9 {
  opacity: 0.8 !important;
}
.is-vertical-center {
  display: flex;
  align-items: center;
}
.is-horizontal-center {
  justify-content: center;
}
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>