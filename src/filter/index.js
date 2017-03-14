/**
 * Created by lichao on 2016/12/30.
 */

import Vue from 'vue';

Vue.filter('booleanFormat', require('./booleanFormatter'));
Vue.filter('percentageFormat', require('./percentageFormatter'));
Vue.filter('byteFormat', require('./byteFormatter'));
Vue.filter('timestampFormat', require('./timestampFormatter'));
Vue.filter('date', require('./timestampFormatter'));
