<template>
  <FormContainer>
    <Title>
      <img src="../../assets/map-clock.png" alt="mapa com um relógio" />
      <h1>Insira o destino e o peso</h1>
    </Title>

    <!-- input de destino -->
    <InputContainer>
      <label for="cidade">Destino</label>
      <Select v-model="city">
        <option selected>Selecione o destino</option>
        <option v-for="c in citys" :key="c.id">
          {{ c.city }}
        </option>
      </Select>
    </InputContainer>

    <!-- input de peso -->
    <InputContainer>
      <label for="peso">Peso</label>
      <Input placeholder="300 kg" type="number" v-model="weight" />
    </InputContainer>

    <!-- botao de analisar -->
    <Button @click="emitSubmit">Analisar</Button>
  </FormContainer>
</template>

<script>
import {
  FormContainer,
  InputContainer,
  Title,
  Button,
  Select,
  Input,
} from "./styles.js";

export default {
  name: "form-component",
  components: {
    FormContainer,
    InputContainer,
    Title,
    Button,
    Select,
    Input,
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
