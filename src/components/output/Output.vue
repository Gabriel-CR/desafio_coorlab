<template>
  <OutputContainer>
    <div v-if="showOutput">
      <h2>
        Estas são as melhores alternativas de frete que encontramos para você.
      </h2>
      <Frete
        :image="require('../../assets/give-money.png')"
        alt="clock"
        :transportadora="frete.menorValor.transportadora"
        :tempo="frete.menorValor.tempo"
        :preco="frete.menorValor.preco"
      />

      <Frete
        :image="require('../../assets/time.png')"
        alt="mão com moeda"
        :transportadora="frete.maisRapido.transportadora"
        :tempo="frete.maisRapido.tempo"
        :preco="frete.maisRapido.preco"
      />

      <button @click="clear">Limpar</button>
    </div>

    <h2 v-else>Nenhum dado selecionado</h2>
  </OutputContainer>
</template>

<script>
import Frete from "../frete/Frete.vue";
import { OutputContainer } from "./styles.js";

export default {
  name: "output-component",
  components: {
    Frete,
    OutputContainer,
  },
  props: {
    showOutput: Boolean,
    frete: Object,
  },
  data() {
    return {};
  },
  methods: {
    clear(event) {
      event.preventDefault();
      this.$emit("emit-clear");
    },
  },
};
</script>
