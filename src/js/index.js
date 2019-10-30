import {Prism} from '../../vendors/prism/prism'
import {edModal} from '../../node_modules/ed-ui/src/js/modal'
import {edTabs} from './modules/tabs'
import {stickyCard} from './modules/sticky-card'
import {meatballsMenu} from './modules/meatballs'
import activeMenu from './modules/activeMenuItem'
import openMenu from './modules/menu'


window.edModal = edModal;
window.edTabs = edTabs;
window.stickyCard = stickyCard;
window.meatballsMenu = meatballsMenu;

activeMenu('main-menu');
activeMenu('vertical-menu');

openMenu('main-menu', 'main-menu-toggle');
openMenu('vertical-menu', 'vertical-menu-toggle');

edTabs();
// edModal();

// Sticky card de curso
stickyCard('course-title', 'course-temary','course-card');

Prism();
