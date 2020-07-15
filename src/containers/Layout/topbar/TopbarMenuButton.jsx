import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'; 

export default class TopbarMenuLinks extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      title, icon,  onClick,
    } = this.props;

    return (
      <div className="topbar__link" onClick={onClick}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </div>
    );
  }
}