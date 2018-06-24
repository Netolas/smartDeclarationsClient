<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="loading" :canCancel="false"></b-loading>
    <a class="button is-primary" @click="start">
      <span class="icon">
        <b-icon pack="fas" icon="check" size="is-small">
        </b-icon>
      </span>
      <span>Realizar Declaración Laboral</span>
    </a>
    <div v-for="laboral in laborales" :key="laboral.id">
      <span>Declaración: {{formatDate(laboral.createdAt)}}</span>
      <b-table :data="laboral.hist_lab" :striped="true" :loading="loading">

        <template slot-scope="props">
          <b-table-column field="carrera" label="Carrera">
            {{ props.row.carrera }}
          </b-table-column>

          <b-table-column field="cedula" label="Cedula">
            {{ props.row.cedula }}
          </b-table-column>

          <b-table-column field="institucion" label="Institución">
            {{ props.row.institucion }}
          </b-table-column>

          <b-table-column field="nivel_escolaridad" label="Escolaridad">
            {{ props.row.nivel_escolaridad }}
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
      <a class="button is-primary" @click="show=true">
        <span class="icon">
          <b-icon pack="fas" icon="file-download" size="is-small">
          </b-icon>
        </span>
        <span>Descargar Comprobante</span>
      </a>
      <br><br>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Academica",
  data() {
    return {
      laborales: [],
      loading: false
    };
  },
  methods: {
    formatDate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    start: function() {
      this.loading = true;
      this.$store
        .dispatch("runlaboral")
        .then(laboral => {
          console.log(laboral);
          this.laborales.push(laboral);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    console.log("aqui Mero");
    this.loading = true;
    this.$store
      .dispatch("getLaborales")
      .then(laborales => {
        console.log(laborales);
        this.laborales = laborales;
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