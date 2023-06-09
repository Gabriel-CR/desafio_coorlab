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
    <button v-on:click="handleSubmit">Analisar</button>
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
    handleSubmit() {
      // const store = useStore();
      // store.dispatch("setCity", this.city);
      // store.dispatch("setWeight", this.weight);
      console.log("oi");
    },
  },
  data() {
    const city = "Selecione o destino";
    const weight = "";

    return {
      city,
      weight,
    };
  },
};
</script>
