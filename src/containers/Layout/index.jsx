/* eslint-disable no-return-assign */
import React, {  useEffect } from 'react';
import { withRouter } from 'react-router-dom'; 
import classNames from 'classnames';
import NotificationSystem from 'rc-notification';
import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import { BasicNotification } from '../../shared/components/Notification';

import { useRecoilState } from 'recoil'
import { sideBarCollapse, sideBarShow, layoutColorState ,customizerState, rtlState} from '../../localState/layoutState';


let notification = null;

const showNotification = (rtl) => {
  notification.notice({
    content: <BasicNotification
      title="👋 Chào bạn!"
      message="Chúc bạn có những giây phút làm việc vui vẻ"
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: `right-up ${rtl}-support`,
  });
};

const Layout = (props) => {
  const [sidebarcol, setSideBarCollapse] = useRecoilState(sideBarCollapse);
  const [sidebarshow, setSideBarShow] = useRecoilState(sideBarShow);
  const [theme, setLayoutColor] = useRecoilState(layoutColorState);
  const [customizer,setCustomizer] =  useRecoilState(customizerState);
  const [rtl,setRtl] =  useRecoilState(rtlState);

  useEffect(() => {
    
    NotificationSystem.newInstance({ style: { top: 65 } }, n => notification = n);
    setTimeout(() => showNotification(rtl.direction), 700);
  }, [])
  useEffect(() => {
    return () => {
      notification.destroy();
    }
  }, [])

  const changeSidebarVisibility = () => {
    setSideBarCollapse(!sidebarcol)
  };

  const changeMobileSidebarVisibility = () => {
    setSideBarShow(!sidebarshow)
  };

  const changeToDark = () => { 
    setLayoutColor({...theme,  classNames: "theme-dark" })
  };

  const changeToLight = () => { 

    setLayoutColor({ ...theme,  classNames: "theme-light" })
  };  


  const {  user,
  } = props;  
  const sidebar = { show: sidebarshow, collapse: sidebarcol };

  const layoutClass = classNames({
    layout: true,
    'layout--collapse': sidebar.collapse,
    'layout--top-navigation': customizer.topNavigation,
  });

  return (
    <div className={layoutClass}>
 
      {customizer.topNavigation
        ? (
          <TopbarWithNavigation
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        )
        : (
          <Topbar
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
            changeSidebarVisibility={changeSidebarVisibility}
            user={user}
          />
        )
      }
      {customizer.topNavigation
        ? (
          <SidebarMobile
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        )
        : (
          <Sidebar
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        )
      }
    </div>
  );

}

export default Layout;
