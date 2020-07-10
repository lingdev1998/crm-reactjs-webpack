/* eslint-disable no-return-assign */
import React, {  useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import classNames from 'classnames';
import NotificationSystem from 'rc-notification';
import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import Customizer from './customizer/Customizer';
import { BasicNotification } from '../../shared/components/Notification';
import {
  changeDirectionToRTL, changeDirectionToLTR,
} from '../../redux/actions/rtlActions';
import { changeBorderRadius, toggleBoxShadow, toggleTopNavigation } from '../../redux/actions/customizerActions';
import {
  CustomizerProps, SidebarProps, ThemeProps, RTLProps, UserProps,
} from '../../shared/prop-types/ReducerProps';

import { useRecoilState } from 'recoil'
import { sideBarCollapse, sideBarShow, layoutColorState } from './layoutState';


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
  useEffect(() => {
    const { rtl } = props;
    NotificationSystem.newInstance({ style: { top: 65 } }, n => notification = n);
    setTimeout(() => showNotification(rtl.direction), 700);
  }, [])
  useEffect(() => {
    return () => {
      notification.destroy();
    }
  }, [])

  const changeSidebarVisibility = () => {

    console.log("set")
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

  const changeToRTL = () => {
    
    const { dispatch } = props;
    dispatch(changeDirectionToRTL());
  };

  const changeToLTR = () => {
    const { dispatch } = props;
    dispatch(changeDirectionToLTR());
  };

  const toggleTopNavigation = () => {
    console.log("toggleTopNavigation")
    const { dispatch } = props;
    dispatch(toggleTopNavigation());
  };

  const changeBorderRadius = () => {
    const { dispatch } = props;
    dispatch(changeBorderRadius());
  };

  const toggleBoxShadow = () => {
    const { dispatch } = props;
    dispatch(toggleBoxShadow());
  };


  const {
    customizer, rtl, user,
  } = props; 
  console.log(customizer)
  const sidebar = { show: sidebarshow, collapse: sidebarcol };

  const layoutClass = classNames({
    layout: true,
    'layout--collapse': sidebar.collapse,
    'layout--top-navigation': customizer.topNavigation,
  });

  return (
    <div className={layoutClass}>
      <Customizer
        customizer={customizer}
        sidebar={sidebar}
        theme={theme}
        rtl={rtl}
        changeSidebarVisibility={changeSidebarVisibility}
        toggleTopNavigation={toggleTopNavigation}
        changeToDark={changeToDark}
        changeToLight={changeToLight}
        changeToRTL={changeToRTL}
        changeToLTR={changeToLTR}
        changeBorderRadius={changeBorderRadius}
        toggleBoxShadow={toggleBoxShadow}
      />
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

export default withRouter(connect(state => ({
  customizer: state.customizer,
  rtl: state.rtl,
  user: state.user,
}))(Layout));
