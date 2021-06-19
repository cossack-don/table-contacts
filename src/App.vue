<template>
  <!-- https://docs.google.com/document/d/1dlX54GtpclZIRMzUHNTgGK08FgMeza8Ux3EwJS_ZLUQ/edit# -->
  <div id="app">
    <MainWrapper />
  </div>
</template>

<script>
import MainWrapper from "./components/MainWrapper";

export default {
  components: {
    MainWrapper,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
