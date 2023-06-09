<template>
  <FormContainer>
    <div class="title">
      <img src="../../assets/map-clock.png" alt="mapa e relógio" />
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
    <button v-on:click="sendData">Analisar</button>
  </FormContainer>
</template>

<script>
import { FormContainer, InputContainer } from "./styles";
// import { useStore } from "@/store";

export default {
  name: "FormInput",
  components: {
    FormContainer,
    InputContainer,
  },
  props: {
    citys: Array,
  },
  methods: {
    sendData(event) {
      console.log(this.city, this.weight);
      this.$emit("send-data", this.city, this.weight, event);
      console.log("oi");
    },
  },
  data() {
    return {
      city: "Selecione o destino",
      weight: "",
    };
  },
};
</script>
