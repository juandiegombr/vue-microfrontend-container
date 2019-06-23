<template>
  <div id="app">
    <div id="nav">
    </div>
    <div class="main-container">
      <div class="sidebar-menu">
        <router-link to="/">Home</router-link>
        <router-link to="/first">First</router-link>
        <router-link to="/second">Second</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background-color: #4DBDD5;
}

.sidebar-menu a {
  font-weight: bold;
  color: #FFF;
  text-decoration: none;
  padding: 16px
}

.sidebar-menu a:hover {
  background-color: #FFFFFF65;
}

.sidebar-menu a.router-link-exact-active {
  background-color: #FFFFFF20;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  width: 240px;
  background-color: #00205B;
  height: calc(100vh - 60px);
}

.main-container {
  display: flex;
}

.page {
  padding: 40px;
  width: calc(100vw - 240px);
  box-sizing: border-box;
}

.page h1 {
  margin: 0px;
}
</style>
