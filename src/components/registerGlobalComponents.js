/**
 * Created by lichao on 2017/3/16.
 */
import Vue from 'vue';

import limitBtn from './common/limitButton';
import page from './common/page';
import tableFooter from './common/tableFooter';
import optionSpace from './common/optionSpace.vue';
import optionSpaceItem from './common/optionSpaceItem.vue';

Vue.component(limitBtn.name, limitBtn);
Vue.component(page.name, page);
Vue.component(tableFooter.name, tableFooter);
Vue.component(optionSpace.name, optionSpace);
Vue.component(optionSpaceItem.name, optionSpaceItem);
