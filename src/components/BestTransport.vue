<template>
  <div class="title">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="ml-2">
        <img src="../assets/logo.png" alt="Logo da empresa" />
        <b>{{ appName }}</b>
      </b-navbar-brand>
    </b-navbar>
    <Main></Main>
  </div>
</template>

<script>
import { BNavbar, BNavbarBrand } from "bootstrap-vue";
import Main from "./Main.vue";

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    Main,
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
