<template>
  <div class="title">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="ml-2">
        <img src="../assets/logo.png" alt="Logo da empresa" />
        <b>{{ appName }}</b>
      </b-navbar-brand>
    </b-navbar>
    <form>
      <h1>Insira o destino e o peso</h1>
      <!-- input de destino -->
      <label for="cidade">Destino</label>
      <select class="form-select" aria-label="Destino" id="destino">
        <option selected>Selecione o destino</option>
      </select>
      <!-- input de peso -->
      <label for="peso">Peso</label>
      <input
        type="text"
        class="form-control"
        id="peso"
        placeholder="300 kg"
        aria-label="Peso"
      />
      <!-- botao de analisar -->
      <button type="button" class="btn btn-primary">Analisar</button>
    </form>
    <!-- saida dos dados -->
    <div>
      <h1>Nenhum dado selecionado</h1>
    </div>
  </div>
</template>

<script>
import { BNavbar, BNavbarBrand } from "bootstrap-vue";

export default {
  components: {
    BNavbar,
    BNavbarBrand,
  },
  data() {
    const appName = "";

    return {
      appName,
    };
  },
  created() {
    // Implemente aqui o GET dos dados da API REST
    // para que isso ocorra na inicialização da pagina

    this.appName = "Melhor Frete";
  },
  methods: {
    // Implemente aqui os metodos utilizados na pagina
    methodFoo() {
      console.log(this.appName);
    },
  },
  watch: {},
};
</script>

<style scoped>
.title .navbar {
  background-color: #00aca6 !important;
}

.title .navbar-brand {
  margin-left: 20px;
}

.title .navbar-brand img {
  margin-right: 10px;
  width: 30px;
}
</style>
