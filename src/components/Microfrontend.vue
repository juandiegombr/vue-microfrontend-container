<template>
  <div :id="`${name}-container`"></div>
</template>

<script>
import router from '../router'

export default {
  name: 'Microfrontend',
  props: {
    name: {
      type: String,
      required: true
    },
    host: {
      type: String,
      required: true
    }
  },
  methods: {
    renderMicroFrontend () {
      const { name } = this
      console.log(`Render: ${name}`)
      window[`render${name}`](`${name}-container`, router)
    },
    loadStyles (manifest) {
      const { host } = this
      const style  = document.createElement('link');
      style.id = 'cssId'
      style.rel = 'stylesheet'
      style.type = 'text/css'
      style.href = `${host}${manifest['app.css']}`
      style.media = 'all'
      document.head.appendChild(style)
    },
    loadChunkScript (manifest) {
      const { name, host } = this
      const chunkScriptId = `micro-frontend-chunk-script-${name}`
      const chunkScript = document.createElement('script')
      chunkScript.id = chunkScriptId
      chunkScript.src = `${host}${manifest['chunk-vendors.js']}`
      chunkScript.onload = () => this.loadMainScript(manifest)
      document.head.appendChild(chunkScript)
    },
    loadMainScript (manifest) {
      const { name, host } = this
      const scriptId = `micro-frontend-script-${name}`
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `${host}${manifest['app.js']}`
      script.onload = this.renderMicroFrontend
      document.head.appendChild(script)
    }
  },
  mounted () {
    const { name, host } = this
    const scriptId = `micro-frontend-script-${name}`

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend()
      return
    }

    fetch(`${host}asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        console.log(manifest)
        this.loadStyles(manifest)
        this.loadChunkScript(manifest)
      });
  },

  beforeDestroy () {
    const { name } = this
    console.log(`Destroy: ${name}`)
  }
}
</script>
