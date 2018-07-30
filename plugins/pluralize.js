import Vue from 'vue'
Vue.filter('pluralize', (word, amount) => amount > 1 ? `${word}s` : word)
