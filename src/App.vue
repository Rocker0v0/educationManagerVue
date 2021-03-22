<template>
  <div id="app">
      <router-link to="/"></router-link>
      <router-link to="/Home"></router-link>
    <router-view/>
  </div>
</template>

<style >
  body {
    margin: 0;
    padding: 0;
    background: rgb(219, 211, 211);
    width: 100%;
    height: 100%;
  }
html,body,#app{
 height: 100%;
 
}
</style>
