import React  from 'react'; 
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { useRecoilState } from 'recoil'
import {layoutColorState,customizerState,rtlState} from '../../localState/layoutState';

const MainWrapper = (props) => { 
  const [theme, setLayoutColor] = useRecoilState(layoutColorState);
  const [customizer,setCustomizer] =  useRecoilState(customizerState);
  const [rtl,setRtl] =  useRecoilState(rtlState);
 
    const {   children,  location,
    } =  props;

    const wrapperClass = classNames({
      wrapper: true,
      'squared-corner-theme': customizer.squaredCorners,
      'blocks-with-shadow-theme': customizer.withBoxShadow,
      'top-navigation': customizer.topNavigation,
    });

    const direction = location.pathname === '/' ? 'ltr' : rtl.direction;

    return (
      <div className={`${theme.className} ${direction}-support`} dir={direction}>
        <div className={wrapperClass}>
          {children}
        </div>
      </div>
    );
 }

export default withRouter(MainWrapper);
