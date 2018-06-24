<template>
  <div>
    <a class="button is-primary" @click="show=true">
      <span class="icon">
        <b-icon pack="fas" icon="plus-circle" size="is-small">
        </b-icon>
      </span>
      <span>Nuevo Usuario</span>
    </a>
    <user-add :visible="show" @close="show=false" @added="addUser"></user-add>
    <b-table :data="users" :striped="true" :loading="loading">

      <template slot-scope="props">
        <b-table-column field="name" label="Nombre">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="CURP" label="CURP">
          {{ props.row.CURP }}
        </b-table-column>

        <b-table-column field="RFC" label="RFC">
          {{ props.row.RFC }}
        </b-table-column>

        <b-table-column field="email" label="E-Mail">
          {{ props.row.email }}
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large">
              </b-icon>
            </p>
            <p>Aun no se agregan usuarios.</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
import UserAdd from "./UserAdd";
export default {
  name: "userAdmin",
  data() {
    return {
      loading: false,
      users: [],
      show: false
    };
  },
  components: {
    UserAdd
  },
  methods: {
    addUser: function(user) {
      this.users.push(user);
    }
  },
  mounted() {
    console.log("aqui Mero");
    this.loading = true;
    this.$store
      .dispatch("getUsuarios")
      .then(users => {
        console.log(users);
        this.users = users;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
};
</script>

<style scoped>
</style>