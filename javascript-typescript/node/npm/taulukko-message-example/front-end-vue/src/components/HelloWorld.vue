<script setup lang="ts">
  import type { Listener, Message } from "taulukko-messages-client";
import * as echo  from "../assets/libs/echo.js";
 

function out(msg: string){
    const txtOutput:Element|null = 
    document.querySelector("#txtOutput");
    if(txtOutput)
    {
      txtOutput.innerHTML = msg;
    }
  }
 
  echo.listener((msg: Message):any => {
    console.log("echo.listene");
    out("Vindo do servidor:" + msg.data);
  });

  echo.simpleListener((msg: string):any => {
    out(msg);
  });
 
  
  const props = defineProps<{
    msg: string
  }>();

  function echoByLib(){
    echo.byLib("Hello World! 1");
  }

  function echoByTaulukko(){
    echo.byTaulukko("Hello World! 2");
  }

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <p>You’ve successfully created a project with</p>
      <textarea id="txtOutput"> </textarea>
      <button @click="echoByLib"> Echo by lib</button>
      <button @click="echoByTaulukko"> Echo by Taulukko Messages</button>
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

textarea {
  width: 100%;
  height: 100px;
  margin: 10px 0;
}
</style>
