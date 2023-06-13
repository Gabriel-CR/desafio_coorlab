<template>
  <OutputContainer>
    <Output v-if="showOutput">
      <h2>
        Estas são as melhores alternativas de frete que encontramos para você.
      </h2>

      <Frete
        title="Frete com menor valor"
        :image="require('../../assets/give-money.png')"
        alt="clock"
        :transportadora="frete.menorValor.transportadora"
        :tempo="frete.menorValor.tempo"
        :preco="frete.menorValor.preco"
      />

      <Frete
        title="Frete mais rápido"
        :image="require('../../assets/time.png')"
        alt="mão com moeda"
        :transportadora="frete.maisRapido.transportadora"
        :tempo="frete.maisRapido.tempo"
        :preco="frete.maisRapido.preco"
      />

      <Button @click="clear">Limpar</Button>
    </Output>

    <h2 v-else>Nenhum dado selecionado</h2>
  </OutputContainer>
</template>

<script>
import Frete from "../frete/Frete.vue";
import { OutputContainer, Output, Button } from "./styles.js";

export default {
  name: "output-component",
  components: {
    Frete,
    OutputContainer,
    Output,
    Button,
  },
  props: {
    showOutput: Boolean,
    frete: Object,
  },
  methods: {
    clear(event) {
      event.preventDefault();
      this.$emit("emit-clear");
    },
  },
};
</script>
