import Vue from 'vue';

Vue.filter('currency', (val: number) =>
    val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
);
