<template>
  <div class="title">
    <Navbar>
      <img src="../assets/logo.png" alt="Logo da empresa" />
      <b>{{ appName }}</b>
    </Navbar>

    <MainContainer>
      <FormContainer>
        <div class="title">
          <img src="../assets/map-clock.png" alt="" />
          <h1>Insira o destino e o peso</h1>
        </div>

        <!-- input de destino -->
        <InputContainer>
          <label for="cidade">Destino</label>
          <select>
            <option selected>Selecione o destino</option>
            <option v-for="c in citys" :key="c.id">
              {{ c }}
            </option>
          </select>
        </InputContainer>

        <!-- input de peso -->
        <InputContainer>
          <label for="peso">Peso</label>
          <input placeholder="300 kg" type="number" value="weight" />
        </InputContainer>

        <!-- botao de analisar -->
        <button v-on:click="handleSubmit">Analisar</button>
      </FormContainer>

      <!-- saida dos dados -->
      <OutputContainer>
        <div v-if="showOutput">
          <h2>
            Estas são as melhores alternativas de frete que encontramos para
            você.
          </h2>
          <InfoFrete>
            <div class="info">
              <div class="img-container">
                <img src="../assets/give-money.png" alt="mão com moeda" />
              </div>
              <div class="info-text">
                <p><strong>Frete com menor valor</strong></p>
                <p>Transportadora: ABCDEFGH LTDA</p>
                <p>Tempo estimado: 6h</p>
              </div>
            </div>
            <div class="price">
              <p><strong>Preço</strong></p>
              <p>R$ 1250,00</p>
            </div>
          </InfoFrete>
          <InfoFrete>
            <div class="info">
              <div class="img-container">
                <img src="../assets/time.png" alt="mão com moeda" />
              </div>
              <div class="info-text">
                <p><strong>Frete mais rápido</strong></p>
                <p>Transportadora: ABCDEFGH LTDA</p>
                <p>Tempo estimado: 6h</p>
              </div>
            </div>
            <div class="price">
              <p><strong>Preço</strong></p>
              <p>R$ 1250,00</p>
            </div>
          </InfoFrete>
        </div>
        <h2 v-else>Nenhum dado selecionado</h2>
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
  InfoFrete,
} from "@/components/styles.js";

export default {
  components: {
    MainContainer,
    Navbar,
    FormContainer,
    OutputContainer,
    InputContainer,
    InfoFrete,
  },
  data() {
    const appName = "";
    const showOutput = false;
    const data = [];
    const citys = [];

    const city = "";
    const weight = 0;

    return {
      appName,
      showOutput,
      data,
      citys,
      city,
      weight,
    };
  },
  created() {
    // Implemente aqui o GET dos dados da API REST
    // para que isso ocorra na inicialização da pagina

    fetch("http://localhost:3000/transport")
      .then((response) => {
        response.json().then((data) => {
          this.data = data;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.appName = "Melhor Frete";
  },
  methods: {
    // Implemente aqui os metodos utilizados na pagina
    methodFoo() {
      console.log(this.appName);
    },
    handleSubmit() {
      this.showOutput = true;
      console.log(this.city);
      console.log(this.weight);
    },
  },
  watch: {
    data() {
      this.data.forEach((element) => {
        this.citys.push({ city: element.city, key: element.id });
      });
      console.log(this.citys);
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
