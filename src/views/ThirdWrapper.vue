<template>
  <div id="first-wrapper">
    <Microfrontend name="First" host='http://localhost:8081/' />
    <Microfrontend name="Second" host='http://localhost:8082/' />
  </div>
</template>

<script>
import Microfrontend from '@/components/Microfrontend'
export default {
  name: 'ThirdWrapper',
  components: {
    Microfrontend
  }
}
</script>
