import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarMail from './TopbarMail';
import TopbarNotification from './TopbarNotification';  
import { UserProps } from '../../../shared/prop-types/ReducerProps';
 class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
    user: UserProps.isRequired,
  };
   render() {
    const logo = `${process.env.PUBLIC_URL}/img/landing/dhpdlogo.png`;
    const { changeMobileSidebarVisibility, changeSidebarVisibility, user } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <Link className="topbar__logo" style={{backgroundImage: `url(${logo})`}} to="/dashboard_default" />
          </div>
          <div className="topbar__right">
             <TopbarNotification />
            <TopbarMail new />
            <TopbarProfile user={user} /> 
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
