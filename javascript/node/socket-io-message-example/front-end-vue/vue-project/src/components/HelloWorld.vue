<script setup lang="ts">
  import * as echo  from "../assets/libs/echo.js";

  const props = defineProps<{
    msg: string
  }>()
  function echoByLib(){
    echo.byLib("Hello World! 1");
  }

  function echoBySocketIO(){
    echo.bySocketIO("Hello World! 2");
  }

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
 
      <button @click="echoByLib"> Echo by lib</button>
      <button @click="echoBySocketIO"> Echo by SocketIO</button>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
