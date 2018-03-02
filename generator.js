module.exports = (api, opts, rootOpts) => {
  api.extendPackage({
    dependencies: {
      vuetify: "^1.0.3"
    }
  })

  // adapted from https://github.com/Akryum/vue-cli-plugin-apollo/blob/master/generator/index.js#L68-L91
  api.onCreateComplete(() => {
    const fs = require('fs')

    // Modify main.js
    {
      const tsPath = api.resolve('./src/main.ts')
      const jsPath = api.resolve('./src/main.js')

      const mainPath = fs.existsSync(tsPath) ? tsPath : jsPath
      let content = fs.readFileSync(mainPath, { encoding: 'utf8' })

      const lines = content.split(/\r?\n/g).reverse()

      // Inject import
      const lastImportIndex = lines.findIndex(line => line.match(/^import/))
      lines[lastImportIndex] += `
        import Vuetify from 'vuetify'

        Vue.use(Vuetify)
      `

      // Modify app
      content = lines.reverse().join('\n')
      fs.writeFileSync(mainPath, content, { encoding: 'utf8' })
    }
  })
}