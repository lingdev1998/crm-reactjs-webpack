import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRecoilState } from 'recoil'
import { rtlState} from '../../../../localState/layoutState';

const SidebarCategory =  (props) =>  {

  const [collapse, setConlapse] = useState(false);

  const [rtl,setRtl] =  useRecoilState(rtlState);

  const defaultProps = {
    icon: '',
    isNew: false,
  };


  const toggle = () => {
    setConlapse(!collapse);
  };

    const {
      title, icon, isNew, children,
    } = props;
     const categoryClass = classNames({
      'sidebar__category-wrap': true,
      'sidebar__category-wrap--open': collapse,
    });

    return (
      <div className={categoryClass}>
        <button className="sidebar__link sidebar__category" type="button" onClick={() => toggle}>
          {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ''}
          <p className="sidebar__link-title">{title}
            {isNew && <span className="sidebar__category-new" />}
          </p>
          <span className={`sidebar__category-icon lnr lnr-chevron-${rtl.direction === 'rtl' ? 'left' : 'right'}`} />
        </button>
        <Collapse isOpen={collapse} className="sidebar__submenu-wrap">
          <ul className="sidebar__submenu">
            <div>
              {children}
            </div>
          </ul>
        </Collapse>
      </div>
    );
 }

export default SidebarCategory;
