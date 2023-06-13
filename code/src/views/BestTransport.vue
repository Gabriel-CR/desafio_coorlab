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
import Navbar from "../components/navbar/Navbar.vue";
import Form from "../components/form/Form.vue";
import Output from "../components/output/Output.vue";
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
    /*
      Função callback recebida do componente Output
      para os campos do formulário
    */
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
    /*
      Receber os valores do formulário
      @params: 
        city: cidade escolhida no formulário
        weight: peso do produto
    */
    receiveSubmit({ city, weight }) {
      this.city = city;
      this.weight = weight;
      this.handleSubmit();
    },
    /*
      Verificar se os campos foram preenchidos, 
      além de verificar se o peso é maior que 0
      caso cumpra os requisitos, chama o método calculate
    */
    handleSubmit() {
      if (
        this.city === "Selecione o destino" ||
        this.weight === "" ||
        this.weight <= 0
      ) {
        this.$alert("", "Insira os valores para realizar a análise", "warning");
        return;
      }

      // calcular o frete
      this.calculate();

      this.showOutput = true;
    },
    /*
      Calcular os fretes com menor valor e mais rápido
    */
    calculate() {
      const { city, weight } = this;

      // encontrar transportadoras disponíveis para a cidade
      const availableTransporters = this.data.filter(
        (transporter) => transporter.city === city
      );
      // encontrar frete com menor valor para a cidade
      const menorValor = this.findLowerCostTransporter(
        availableTransporters,
        weight
      );

      // encontrar frete mais rápido para a cidade
      const maisRapido = this.findFastestTransporter(availableTransporters);

      // setar os valores no objeto frete com manor valor e mais rápido
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
    /*
      Encontrar o frete com menor valor para a cidade
      de acordo com o peso
      @params: 
        transporters: array de transportadoras disponíveis para a cidade
        weight: peso do produto
    */
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
    /*
      Encontrar o frete mais rápido para a cidade
      de acordo com o peso
      @params: 
        transporters: array de transportadoras disponíveis para a cidade
    */
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
    /*
      Calcular o valor total do frete
      @params: 
        transporter: transportadora escolhida nos métodos findLowerCostTransporter e findFastestTransporter
        weight: peso do produto
    */
    calculateTotalPrice(transporter, weight) {
      const cost =
        weight > 100
          ? transporter.cost_transport_heavy
          : transporter.cost_transport_light;

      return this.convertCashToFloat(cost) * weight;
    },
    /*
      Converter o valor do frete para float
      @params: 
        value: valor do frete com o formato R$ 0.00
    */
    convertCashToFloat(value) {
      return parseFloat(value.replace("R$ ", "").replace(",", "."));
    },
    /*
      Converter o tempo do frete para inteiro
      @params: 
        value: tempo do frete com o formato 0h
    */
    convertTimeToFloat(value) {
      return parseInt(value.replace("h", ""));
    },
  },
  watch: {
    /*
      Observar a mudança de valor da variável data
      e atualizar o valor da variável citys com as cidades disponíveis
    */
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
