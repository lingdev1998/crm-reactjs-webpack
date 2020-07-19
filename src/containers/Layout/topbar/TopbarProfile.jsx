import React, { useState, useEffect } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import ButtonMenu from './TopbarMenuButton';
import {  useRecoilState } from 'recoil'
import { authenticationState } from '../../../localState/authenticationState';
import { AUTH_TOKEN_KEY } from '../../../config/constants';
const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile = (props) => {
  const [authentication, setAuthentication] = useRecoilState(authenticationState);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [authentication.authenticated])
  const [collapse, setCollapse] = useState(false);

  

  return (
    <div className="topbar__profile">
      <button className="topbar__avatar" type="button" onClick={() => setCollapse(!collapse)}>
        <img
          className="topbar__avatar-img"
          //src={ user.avatar || Ava || ""}
          src={"https://www.daunhotsinopec.com/public/front-end/images/avatar.jpg" || Ava || ""}
          alt="avatar"
        />
        <p className="topbar__avatar-name">
          {loading ? 'Loading...' : ""}
        </p>
        <DownIcon className="topbar__icon" />
      </button>
      {collapse && <button className="topbar__back" type="button" onClick={() => setCollapse(!collapse)} />}
      <Collapse isOpen={collapse} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink
            title="My Profile"
            icon="user"
            path="/account/profile"
            onClick={() => setCollapse(!collapse)}
          />
          <TopbarMenuLink
            title="Calendar"
            icon="calendar-full"
            path="/default_pages/calendar"
            onClick={() => setCollapse(!collapse)}
          />
          <TopbarMenuLink
            title="Tasks"
            icon="list"
            path="/todo"
            onClick={() => setCollapse(!collapse)}
          />
          <TopbarMenuLink
            title="Inbox"
            icon="inbox"
            path="/mail"
            onClick={() => setCollapse(!collapse)}
          />
          <div className="topbar__menu-divider" />
          <TopbarMenuLink
            title="Account Settings"
            icon="cog"
            path="/account/profile"
            onClick={() => setCollapse(!collapse)}
          />
          <TopbarMenuLink
            title="Lock Screen"
            icon="lock"
            path="/lock_screen"
            onClick={() => setCollapse(!collapse)}
          />
          {authentication.authenticated && (
            <ButtonMenu
              title="Đăng xuất"
              icon="exit" 
              onClick={(e) => {
                localStorage.removeItem(AUTH_TOKEN_KEY);
                setAuthentication({ ...authentication, authenticated: false })
                window.history.push('/login');
                e.preventDefault();
              }}
            />
          )
          }

        </div>
      </Collapse>
    </div>
  );

}

export default TopbarProfile;
