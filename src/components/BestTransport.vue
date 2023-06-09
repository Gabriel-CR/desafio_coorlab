<template>
  <div class="title">
    <Navbar>
      <img :src="require('../assets/logo.png')" alt="Logo da empresa" />
      <b>{{ appName }}</b>
    </Navbar>

    <MainContainer>
      <FormContainer>
        <div class="title">
          <img
            :src="require('../assets/map-clock.png')"
            alt="mapa com um relógio"
          />
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
                <img
                  :src="require('../assets/give-money.png')"
                  alt="mão com moeda"
                />
              </div>

              <div class="info-text">
                <p><strong>Frete com menor valor</strong></p>
                <p>Transportadora: {{ frete.menorValor.transportadora }}</p>
                <p>Tempo estimado: {{ frete.menorValor.tempo }}</p>
              </div>
            </div>

            <div class="price">
              <p><strong>Preço</strong></p>
              <p>{{ frete.menorValor.preco }}</p>
            </div>
          </InfoFrete>
          <!-- frete com entrega mais rápida -->
          <InfoFrete>
            <div class="info">
              <div class="img-container">
                <img :src="require('../assets/time.png')" alt="mão com moeda" />
              </div>

              <div class="info-text">
                <p><strong>Frete mais rápido</strong></p>
                <p>Transportadora: {{ frete.maisRapido.transportadora }}</p>
                <p>Tempo estimado: {{ frete.maisRapido.tempo }}</p>
              </div>
            </div>

            <div class="price">
              <p><strong>Preço</strong></p>
              <p>{{ frete.maisRapido.preco }}</p>
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
      const { city, weight } = this;
      const availableTransporters = this.data.filter(
        (transporter) => transporter.city === city
      );
      // encontrar frete com menor valor para a cidade
      const menorValor = this.findLowerCostTransporter(
        availableTransporters,
        weight
      );

      // encontrar frete mais rápido para a cidade
      const maisRapido = this.findFastestTransporter(
        availableTransporters,
        weight
      );

      this.frete.menorValor = {
        transportadora: menorValor.name,
        tempo: menorValor.lead_time,
        preco: this.calculateTotalPrice(menorValor, weight)
          .toFixed(2)
          .replace(".", ","),
      };

      this.frete.maisRapido = {
        transportadora: maisRapido.name,
        tempo: maisRapido.lead_time,
        preco: this.calculateTotalPrice(maisRapido, weight)
          .toFixed(2)
          .replace(".", ","),
      };
    },
    findLowerCostTransporter(transporters, weight) {
      return transporters.reduce((prev, current) => {
        const prevCost =
          weight > 100 ? prev.cost_transport_heavy : prev.cost_transport_light;
        const currentCost =
          weight > 100
            ? current.cost_transport_heavy
            : current.cost_transport_light;

        if (
          this.convertCashToFloat(prevCost) <
          this.convertCashToFloat(currentCost)
        ) {
          return prev;
        } else {
          return current;
        }
      });
    },
    findFastestTransporter(transporters) {
      return transporters.reduce((prev, current) => {
        if (
          this.convertTimeToFloat(prev.lead_time) <
          this.convertTimeToFloat(current.lead_time)
        ) {
          return prev;
        } else {
          return current;
        }
      });
    },
    calculateTotalPrice(transporter, weight) {
      const cost =
        weight > 100
          ? transporter.cost_transport_heavy
          : transporter.cost_transport_light;

      return this.convertCashToFloat(cost) * weight;
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
