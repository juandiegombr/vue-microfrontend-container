<template>
  <div id="first-wrapper">
    <Microfrontend name="First" host='http://localhost:8081/' />
  </div>
</template>

<script>
import Microfrontend from '@/components/Microfrontend'
export default {
  name: 'FirstWrapper',
  components: {
    Microfrontend
  }
}
</script>
