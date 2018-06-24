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
        <span>Realizar Declaración Patrimonial</span>
      </a>
    </div>
    <div v-for="patrimonial in patrimoniales" :key="patrimonial.id">
      <p>HASH enviado a Smart Contract: {{patrimonial.hashPDF}}</p>
      <span>Inmuebles - Declaración: {{formatDate(patrimonial.createdAt)}}</span>
      <b-table :data="patrimonial.inmuhebles" :striped="true" :loading="loading">

        <template slot-scope="props">
          <b-table-column field="tipo" label="Tipo">
            {{ props.row.tipo }}
          </b-table-column>

          <b-table-column field="ubicacion" label="Ubicación">
            {{ props.row.ubicacion }}
          </b-table-column>

          <b-table-column field="monto" label="Monto">
            {{ props.row.monto }}
          </b-table-column>

          <b-table-column field="fecha_adquisicion" label="Fecha Adquisición">
            {{ formatDate(props.row.fecha_adquisicion) }}
          </b-table-column>

          <b-table-column field="monto" label="Monto Adquisición">
            {{ props.row.monto }}
          </b-table-column>

          <b-table-column field="forma_adquisicion" label="Forma Adquisición">
            {{ props.row.forma_adquisicion }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="sectión">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large">
                </b-icon>
              </p>
              <p>Sin Datos.</p>
            </div>
          </section>
        </template>
      </b-table>
      <br><br>
      <span>Vehículos - Declaración: {{formatDate(patrimonial.createdAt)}}</span>
      <b-table :data="patrimonial.vehiculos" :striped="true" :loading="loading">

        <template slot-scope="props">
          <b-table-column field="marca" label="Marca">
            {{ props.row.marca }}
          </b-table-column>

          <b-table-column field="monto" label="Monto">
            {{ props.row.monto }}
          </b-table-column>

          <b-table-column field="fecha_adquisicion" label="Fecha Adquisición">
            {{ formatDate(props.row.fecha_adquisicion) }}
          </b-table-column>

          <b-table-column field="forma_adquisicion" label="Forma Adquisición">
            {{ props.row.forma_adquisicion }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="sectión">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large">
                </b-icon>
              </p>
              <p>Sin Datos.</p>
            </div>
          </section>
        </template>
      </b-table>
      <br><br>
      <span>Ingresos - Declaración: {{formatDate(patrimonial.createdAt)}}</span>
      <b-table :data="patrimonial.ingreso" :striped="true" :loading="loading">

        <template slot-scope="props">
          <b-table-column field="institucion" label="Institución">
            {{ props.row.institucion }}
          </b-table-column>

          <b-table-column field="puesto" label="Puesto">
            {{ props.row.puesto }}
          </b-table-column>

          <b-table-column field="sueldo" label="Sueldo">
            {{ props.row.sueldo }}
          </b-table-column>

          <b-table-column field="fecha_inicio" label="Fecha Inicio">
            {{ formatDate(props.row.fecha_inicio) }}
          </b-table-column>

          <b-table-column field="fecha_conclusion" label="Fecha Conclusión">
            {{ formatDate(props.row.fecha_conclusion) }}
          </b-table-column>

        </template>

        <template slot="empty">
          <section class="sectión">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large">
                </b-icon>
              </p>
              <p>Sin Datos.</p>
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
import contract from "truffle-contract";
import DeclaracionContract from "@/contratos/Declaracion.json";
import moment from "moment";
export default {
  name: "Patrimonial",
  data() {
    return {
      patrimoniales: [],
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
      this.processed = true;
      this.loading = true;
      this.$store
        .dispatch("runPatrimonial")
        .then(patrimonial => {
          console.log(patrimonial);
          var hash = patrimonial.hashPDF;
          this.createContract({RFC:'XXXX00000XX1',pdf:hash})
          this.patrimoniales.push(patrimonial);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    startContract: function() {
      let self = this;

      return new Promise(function(resolve, reject) {
        self.contract = contract(DeclaracionContract);
        console.log(window.web3.currentProvider);
        
        self.contract.setProvider(window.web3.currentProvider);

        self.contract
          .deployed()
          .then(instance => {
            self.instance = instance;
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    createContract: function(data) {
      let self = this;
      return new Promise((resolve, reject) => {
        self.instance
          .create(window.web3.eth.accounts[0], data.RFC, 'Patrimonial', '2018','Inicial',data.pdf , { from: window.web3.eth.accounts[0] })
          .then(tx => {
            resolve(tx);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  mounted() {
    this.startContract();
    console.log("aqui Mero");
    this.loading = true;
    this.$store
      .dispatch("getPatrimoniales")
      .then(patrimoniales => {
        console.log(patrimoniales);
        this.patrimoniales = patrimoniales;
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