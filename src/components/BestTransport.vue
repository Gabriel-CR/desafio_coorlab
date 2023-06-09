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
          <select v-model="city">
            <option selected>Selecione o destino</option>
            <option v-for="c in citys" :key="c.id">
              {{ c.city }}
            </option>
          </select>
        </InputContainer>

        <!-- input de peso -->
        <InputContainer>
          <label for="peso">Peso</label>
          <input placeholder="300 kg" type="number" v-model="weight" />
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
                <p>
                  Transportadora: {{ this.frete.menorValor.transportadora }}
                </p>
                <p>Tempo estimado: {{ this.frete.menorValor.tempo }}</p>
              </div>
            </div>
            <div class="price">
              <p><strong>Preço</strong></p>
              <p>{{ this.frete.menorValor.preco }}</p>
            </div>
          </InfoFrete>
          <InfoFrete>
            <div class="info">
              <div class="img-container">
                <img src="../assets/time.png" alt="mão com moeda" />
              </div>
              <div class="info-text">
                <p><strong>Frete mais rápido</strong></p>
                <p>
                  Transportadora: {{ this.frete.maisRapido.transportadora }}
                </p>
                <p>Tempo estimado: {{ this.frete.maisRapido.tempo }}</p>
              </div>
            </div>
            <div class="price">
              <p><strong>Preço</strong></p>
              <p>{{ this.frete.maisRapido.preco }}</p>
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

    const city = "Selecione o destino";
    const weight = "";

    const frete = {
      menorValor: {
        transportadora: "",
        tempo: "",
        preco: "",
      },
      maisRapido: {
        transportadora: "",
        tempo: "",
        preco: "",
      },
    };

    return {
      appName,
      showOutput,
      data,
      citys,
      city,
      weight,
      frete,
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
    handleSubmit(event) {
      event.preventDefault();

      // verificar se os campos estão preenchidos
      if (this.city === "Selecione o destino" || this.weight === "") {
        alert("Preencha todos os campos");
        return;
      }

      this.frete.menorValor.preco = this.data[0].cost_transport_light;
      this.frete.menorValor.transportadora = this.data[0].name;
      this.frete.menorValor.tempo = this.data[0].lead_time;

      this.frete.maisRapido.preco = this.data[0].cost_transport_heavy;
      this.frete.maisRapido.tempo = this.data[0].lead_time;
      this.frete.maisRapido.transportadora = this.data[0].name;

      if (this.weight > 100) {
        this.frete.menorValor.preco = this.data[0].cost_transport_heavy;
        this.frete.maisRapido.preco = this.data[0].cost_transport_heavy;
      }

      // encontrar frete com menor valor
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].city === this.city) {
          if (this.data[i].cost_transport_light < this.frete.menorValor.preco) {
            this.frete.menorValor.transportadora = this.data[i].name;
            this.frete.menorValor.tempo = this.data[i].lead_time;
            if (this.weight > 100) {
              this.frete.menorValor.preco = this.data[i].cost_transport_heavy;
            } else {
              this.frete.menorValor.preco = this.data[i].cost_transport_light;
            }
          }
        }
      }

      // encontrar frete mais rápido
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].city === this.city) {
          if (this.data[i].lead_time < this.frete.maisRapido.tempo) {
            this.frete.maisRapido.transportadora = this.data[i].name;
            this.frete.maisRapido.tempo = this.data[i].lead_time;
            if (this.weight > 100) {
              this.frete.maisRapido.preco = this.data[i].cost_transport_heavy;
            } else {
              this.frete.maisRapido.preco = this.data[i].cost_transport_light;
            }
          }
        }
      }

      this.showOutput = true;
      console.log(this.frete.menorValor);
      console.log(this.frete.maisRapido);
    },
  },
  watch: {
    data() {
      this.data.forEach((element) => {
        this.citys.push({ city: element.city, key: element.id });
      });
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
