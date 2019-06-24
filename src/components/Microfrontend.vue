<template>
  <div :id="`${name}-container`"></div>
</template>

<script>
import router from '@/router'

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
      window[`render${name}`](`${name}-container`, router, this.registerListeners, this.unregisterListeners)
    },
    registerListeners (listeners) {
      listeners.forEach(listener => {
        const handler = this.eventRepeater(listener)
        listener.handler = handler
        window.addEventListener(listener.event, handler)
      })
      this.listeners = listeners
    },
    eventRepeater (listener) {
      const handler = e => {
        const element = document.querySelector(listener.selector)
        if (element) {
          element.dispatchEvent(new CustomEvent(`${listener.event}-repeater`, { detail: e.detail }))
        }
      }
      return handler
    },
    unregisterListeners () {
      this.listeners.forEach(listener => {
        const element = document.querySelector(listener.selector)
        if (element) {
          element.removeEventListener(listener.event)
        }
        window.removeEventListener(listener.event, listener.handler)
      })

    },
    loadStyles (manifest) {
      if (!manifest['app.css']) return
      const { host } = this
      const style  = document.createElement('link')
      style.href = `${host}${manifest['app.css']}`
      style.id = 'cssId'
      style.rel = 'stylesheet'
      style.type = 'text/css'
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
      console.log('🚀 Script already added. Rendering Microfrontend!')
      this.renderMicroFrontend()
      return
    }

    fetch(`${host}asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        this.loadStyles(manifest)
        this.loadChunkScript(manifest)
      });
  },

  beforeDestroy () {
    const { name } = this
    window[`unmount${name}`]()
    this.unregisterListeners()
  },

  data () {
    return {
      listeners: []
    }
  }
}
</script>
