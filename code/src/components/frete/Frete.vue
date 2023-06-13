<template>
  <InfoFrete>
    <Info>
      <ImageContainer>
        <img :src="image" :alt="alt" />
      </ImageContainer>

      <div>
        <p><strong>Frete com menor valor</strong></p>
        <p>Transportadora: {{ transportadora }}</p>
        <p>Tempo estimado: {{ tempo }}</p>
      </div>
    </Info>

    <Price>
      <p><strong>Preço</strong></p>
      <p>{{ preco }}</p>
    </Price>
  </InfoFrete>
</template>

<script>
import { InfoFrete, Price, ImageContainer, Info } from "./styles.js";

export default {
  name: "frete-component",
  components: {
    InfoFrete,
    Price,
    ImageContainer,
    Info,
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
