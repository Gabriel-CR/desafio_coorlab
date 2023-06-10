<template>
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
    <button @click="emitSubmit">Analisar</button>
  </FormContainer>
</template>

<script>
import { FormContainer, InputContainer } from "./styles.js";

export default {
  name: "form-component",
  components: {
    FormContainer,
    InputContainer,
  },
  props: {
    citys: Array,
    clear: Boolean,
  },
  data() {
    return {
      city: "Selecione o destino",
      weight: "",
    };
  },
  methods: {
    emitSubmit(event) {
      event.preventDefault();
      this.$emit("emit-submit", {
        city: this.city,
        weight: this.weight,
      });
    },
    clearInputs() {
      this.city = "Selecione o destino";
      this.weight = "";
    },
  },
  watch: {
    clear() {
      this.clearInputs();
    },
  },
};
</script>
