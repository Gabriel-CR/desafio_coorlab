<template>
  <NavbarStyle>
    <img src="../../assets/logo.png" alt="Logo da empresa" />
    <b>{{ appName }}</b>
  </NavbarStyle>
</template>

<script>
import { NavbarStyle } from "./styles.js";

export default {
  name: "nav-bar",
  components: {
    NavbarStyle,
  },
  props: {
    appName: String,
  },
};
</script>

<style></style>
