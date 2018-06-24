<template>
  <div>
    <b-modal :active.sync="show" :canCancel="false">
      <div class="card">
        <div class="card-content">
          <section>
            <b-field label="Nombre">
              <b-input v-model="user.name"></b-input>
            </b-field>

            <b-field label="Email">
              <b-input type="email" v-model="user.email" maxlength="30">
              </b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password" v-model="user.password" password-reveal>
              </b-input>
            </b-field>

            <b-field label="RFC">
              <b-input v-model="user.RFC">
              </b-input>
            </b-field>

            <b-field label="CURP">
              <b-input v-model="user.CURP">
              </b-input>
            </b-field>
          </section>
        </div>
        <div class="card-footer">
            <p class="card-footer-item">

              <a class="button is-primary is-rounded" @click="registrar">Agregar</a>
            </p>
            <p class="card-footer-item">
              <a class="button is-primary is-rounded" @click="show=false">Cancelar</a>
            </p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "UserAdd",
  props: ["visible"],
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        RFC: "",
        CURP: ""
      },
      loading: false
    };
  },
  methods: {
    registrar: function() {
      this.$store
        .dispatch("addUsuario", this.user)
        .then(data => {
          this.loading = false;
          this.$emit("added", data.user);
          this.$emit("close");
          cleanUser()
        })
        .catch(() => {
          this.loading = false;
        });
    },
    cleanUser: function(){
      this.user = {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        RFC: "",
        CURP: ""
      }
      
    }
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
          this.cleanUser()
        }
      }
    }
  }
};
</script>

<style scoped>
</style>