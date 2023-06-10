<template>
  <InfoFrete>
    <div class="info">
      <div class="img-container">
        <img :src="image" :alt="alt" />
      </div>

      <div class="info-text">
        <p><strong>Frete com menor valor</strong></p>
        <p>Transportadora: {{ transportadora }}</p>
        <p>Tempo estimado: {{ tempo }}</p>
      </div>
    </div>

    <div class="price">
      <p><strong>Preço</strong></p>
      <p>{{ preco }}</p>
    </div>
  </InfoFrete>
</template>

<script>
import { InfoFrete } from "./styles.js";

export default {
  name: "frete-component",
  components: {
    InfoFrete,
  },
  props: {
    image: String,
    alt: String,
    transportadora: String,
    tempo: String,
    preco: String,
  },
};
</script>
