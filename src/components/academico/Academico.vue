<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="loading" :canCancel="false"></b-loading>
    <div v-if="!processed">
      <div class="field">
          <b-checkbox v-model="aut">Autorizo al sistema utilizar mi información personal para buscar en las bases de datos gubernamentales</b-checkbox>
      </div>
      <a class="button is-primary" @click="start" :disabled="!aut">
        <span class="icon">
          <b-icon pack="fas" icon="check" size="is-small">
          </b-icon>
        </span>      
        <span>Realizar Declaración Academica</span>
      </a>
    </div>
    <div v-for="academico in academicos" :key="academico.id">
      <span>Declaración: {{formatDate(academico.createdAt)}}</span>
      <b-table :data="academico.hist_acd" :striped="true" :loading="loading">

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
      academicos: [],
      loading: false,
      aut: false,
      processed: false
    };
  },
  methods: {
    formatDate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    start: function() {
      this.processed = true
      this.loading = true;
      this.$store
        .dispatch("runAcademico")
        .then(academico => {
          console.log(academico);
          this.academicos.push(academico);
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
      .dispatch("getAcademicos")
      .then(academicos => {
        console.log(academicos);
        this.academicos = academicos;
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