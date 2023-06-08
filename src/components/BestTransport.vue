<template>
  <div class="title">
    <Navbar>
      <img src="../assets/logo.png" alt="Logo da empresa" />
      <b>{{ appName }}</b>
    </Navbar>

    <MainContainer>
      <FormContainer>
        <h1>Insira o destino e o peso</h1>

        <!-- input de destino -->
        <InputContainer>
          <label for="cidade">Destino</label>
          <select>
            <option selected>Selecione o destino</option>
          </select>
        </InputContainer>

        <!-- input de peso -->
        <InputContainer>
          <label for="peso">Peso</label>
          <input placeholder="300 kg" />
        </InputContainer>

        <!-- botao de analisar -->
        <button>Analisar</button>
      </FormContainer>

      <!-- saida dos dados -->
      <OutputContainer>
        <h1>Nenhum dado selecionado</h1>
      </OutputContainer>
    </MainContainer>
  </div>
</template>

<script>
import {
  MainContainer,
  Navbar,
  FormContainer,
  OutputContainer,
  InputContainer,
} from "@/components/styles.js";

export default {
  components: {
    MainContainer,
    Navbar,
    FormContainer,
    OutputContainer,
    InputContainer,
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
