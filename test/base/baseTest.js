const { JSDOM } = require('jsdom')
const helper = require('./helper')

const initTest = (global) => {
  global.assert = require('chai').assert
  global.sortable = helper.instrument('./src/html.sortable.js')
  global.window = (new JSDOM(``, { runScripts: 'dangerously' })).window
  global.body = window.document.body
  // Execute library by inserting a <script> tag containing it.
  const scriptEl = global.window.document.createElement('script')
  scriptEl.textContent = helper.instrument('./src/html.sortable.js')
  global.window.document.head.appendChild(scriptEl)

  afterEach(() => {
    helper.writeCoverage(global.window)
  })
}

module.exports = initTest
