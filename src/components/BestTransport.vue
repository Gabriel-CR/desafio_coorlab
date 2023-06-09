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
          <!-- frete mais barato -->
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
          <!-- frete com entrega mais rápida -->
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

          <button v-on:click="clear">Limpar</button>
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
    return {
      appName: "",
      showOutput: false,
      data: [],
      citys: [],

      city: "Selecione o destino",
      weight: "",

      frete: {
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
      },
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
      if (
        this.city === "Selecione o destino" ||
        this.weight === "" ||
        this.weight == 0
      ) {
        this.$alert("", "Insira os valores para realizar a análise", "warning");
        return;
      }

      // calcular o frete
      this.calculate();

      this.showOutput = true;
    },
    calculate() {
      // encontrar frete com menor valor para a cidade
      const menorValor = this.data.reduce((prev, current) => {
        if (
          this.convertCashToFloat(
            this.weight > 100
              ? prev.cost_transport_heavy
              : prev.cost_transport_light
          ) <
          this.convertCashToFloat(
            this.weight > 100
              ? current.cost_transport_heavy
              : current.cost_transport_light
          )
        ) {
          return prev.city === this.city ? prev : current;
        }
        return current.city === this.city ? current : prev;
      });

      // encontrar frete mais rápido para a cidade
      const maisRapido = this.data.reduce((prev, current) => {
        if (
          this.convertTimeToFloat(prev.lead_time) <
          this.convertTimeToFloat(current.lead_time)
        ) {
          return prev.city === this.city ? prev : current;
        }
        return current.city === this.city ? current : prev;
      });

      this.frete.menorValor = {
        transportadora: menorValor.name,
        tempo: menorValor.lead_time,
        preco: `R$ ${(
          this.convertCashToFloat(
            this.weight > 100
              ? menorValor.cost_transport_heavy
              : menorValor.cost_transport_light
          ) * this.weight
        )
          .toFixed(2)
          .replace(".", ",")}`,
      };

      this.frete.maisRapido = {
        transportadora: maisRapido.name,
        tempo: maisRapido.lead_time,
        preco: `R$ ${(
          this.convertCashToFloat(
            this.weight > 100
              ? maisRapido.cost_transport_heavy
              : maisRapido.cost_transport_light
          ) * this.weight
        )
          .toFixed(2)
          .replace(".", ",")}`,
      };
    },
    convertCashToFloat(value) {
      return parseFloat(value.replace("R$ ", "").replace(",", "."));
    },
    convertTimeToFloat(value) {
      return parseInt(value.replace("h", ""));
    },
    clear(event) {
      event.preventDefault();
      this.showOutput = false;
      this.city = "Selecione o destino";
      this.weight = "";
      this.frete = {
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
