import React from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css';
import SidebarData from './sidebarData';

function SideBar() {
  return (
    <div>
      <nav className="navbar">
        <ul className="unordered-list">
          <h1 className="data-head">Vespa</h1>
          {SidebarData.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="data-list">
              <Link to={item.path}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}

export default SideBar;
