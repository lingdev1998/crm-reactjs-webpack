import { atom } from 'recoil'; 


const SIDE_BAR_SHOW = 'SIDE_BAR_SHOW';
const SIDE_BAR_COLLAPSE = "SIDE_BAR_COLLAPSE"
const LAYOUT_COLOR = "LAYOUT_COLOR"


const sideBarShow = atom({
  key: SIDE_BAR_SHOW,
  default: false
});

const sideBarCollapse = atom({
    key:SIDE_BAR_COLLAPSE,
    default:false
});

const layoutColorState = atom({
  key: LAYOUT_COLOR,
  default: {className: 'theme-light'}
});
export { sideBarShow,sideBarCollapse,layoutColorState };