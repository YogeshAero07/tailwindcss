const postcss = require('postcss')
const tailwind = require('../index.js')
const fs = require('fs')
const path = require('path')

function run(input, config = {}) {
  return postcss(tailwind(config)).process(input, { from: path.resolve(__filename) })
}

test('opacity', () => {
  let config = {
    darkMode: 'class',
    purge: [path.resolve(__dirname, './opacity.test.html')],
    corePlugins: {
      backgroundOpacity: false,
      borderOpacity: false,
      divideOpacity: false,
      placeholderOpacity: false,
      preflight: false,
      textOpacity: false,
    },
    theme: {},
    plugins: [],
  }

  let css = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `

  return run(css, config).then((result) => {
    let expectedPath = path.resolve(__dirname, './opacity.test.css')
    let expected = fs.readFileSync(expectedPath, 'utf8')

    expect(result.css).toMatchCss(expected)
  })
})