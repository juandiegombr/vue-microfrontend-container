<template>
  <div ref="app" id="app">
    <div id="nav">
      <div class="user-display">
        <img class="user-image" :src="user.image" alt="user">
        <span>{{ user.name }}</span>
      </div>
    </div>
    <div class="main-container">
      <div class="sidebar-menu">
        <router-link to="/" class="home">Home</router-link>
        <router-link to="/first">First</router-link>
        <router-link to="/second">Second</router-link>
        <router-link to="/third">Third</router-link>
        <a href="#" @click="sendEvent">Event</a>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    sendEvent () {
      const event = new CustomEvent('custom-event', {
        bubbles: true,
        detail: { source: 'Container' }
      })
      this.$refs.app.dispatchEvent(event)
    }
  },
  mounted () {
    this.$refs.app.addEventListener('changeUser',  e => { 
      this.$store.commit('setUser', e.detail )
    }, false)
  }
}
</script>


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
  height: 50px;
  background-color: #4DBDD5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.user-display {
  padding: 0px 16px;
  color: #FFF;
  display: flex;
}

.user-image {
  height: 24px;
  width: 24px;
  background-color: #FFF;
  border-radius: 12px;
  margin-right: 8px;
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

.sidebar-menu a.router-link-active:not(.home) {
  background-color: #FFFFFF20;
}

.sidebar-menu a.router-link-exact-active {
  background-color: #FFFFFF20;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  width: 240px;
  background-color: #00205B;
  height: calc(100vh - 50px);
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
