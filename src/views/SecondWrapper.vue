<template>
<div>
  <Microfrontend name="Second" host='http://localhost:8082/' />
</div>
</template>

<script>
import Microfrontend from '@/components/Microfrontend'
export default {
  name: 'SecondWrapper',
  components: {
    Microfrontend
  }
}
</script>
