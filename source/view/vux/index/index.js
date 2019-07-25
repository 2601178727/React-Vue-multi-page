import Vue from 'vue'
import 'normalize.css'
import App from './app'
import FastClick from 'fastclick'

FastClick.attach(document.body);

const app = new Vue({
  el: '#app',
  render: h => h(App)
});
window.app = app.$children[0];
