<template>
  <div class="title">
    <Navbar :appName="appName" />

    <MainContainer>
      <Form :citys="citys" @emit-submit="receiveSubmit" :clear="clear" />
      <Output :showOutput="showOutput" :frete="frete" @emit-clear="emitClear" />
    </MainContainer>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Form from "./Form.vue";
import Output from "./Output.vue";
import { MainContainer } from "./styles.js";

export default {
  name: "MainComponent",
  components: {
    Navbar,
    Form,
    Output,
    MainContainer,
  },
  data() {
    return {
      darkMode: false,

      appName: "",
      showOutput: false,
      data: [],
      citys: [],

      clear: false,

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
    emitClear() {
      this.showOutput = false;
      this.clear = !this.clear;
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
    receiveSubmit({ city, weight }) {
      this.city = city;
      this.weight = weight;
      this.handleSubmit();
    },
    handleSubmit() {
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
