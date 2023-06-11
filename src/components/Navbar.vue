<template>
  <NavbarStyle>
    <div>
      <img :src="require('../assets/logo.png')" alt="Logo da empresa" />
      <b>{{ appName }}</b>
    </div>
    <TogleButton />
  </NavbarStyle>
</template>

<script>
import { NavbarStyle } from "./styles.js";
import TogleButton from "./TogleButton.vue";

export default {
  name: "nav-bar",
  components: {
    NavbarStyle,
    TogleButton,
  },
  props: {
    appName: String,
  },
};
</script>
