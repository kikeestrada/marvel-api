import {Prism} from '../../vendors/prism/prism'
import activeMenu from './modules/activeMenuItem'
import openMenu from './modules/menu'


activeMenu('main-menu');
activeMenu('vertical-menu');

openMenu('main-menu', 'main-menu-toggle');
openMenu('vertical-menu', 'vertical-menu-toggle');
Prism();
