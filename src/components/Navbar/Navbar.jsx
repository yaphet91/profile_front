import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = ['home', 'education', 'projects', 'honors', 'skills', 'contact'];

  const handleNavClick = (event, section) => {
    if (event) {
      event.preventDefault();
    }
    const targetHash = `#${section}`;
    const isHome = location.pathname === '/';

    if (isHome && typeof document !== 'undefined') {
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (typeof window !== 'undefined' && window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    } else {
      navigate('/', {
        state: { targetSection: section },
        replace: false,
      });
    }

    setToggle(false);
  };

  const handleLogoClick = (event) => handleNavClick(event, 'home');

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <a href="/#home" onClick={handleLogoClick}>
          <img src={images.logo} alt="logo" />
        </a>
      </div>
      <ul className="app__navbar-links">
        {navItems.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`/#${item}`} onClick={(event) => handleNavClick(event, item)}>
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {navItems.map((item) => (
                <li key={item}>
                  <a href={`/#${item}`} onClick={(event) => handleNavClick(event, item)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
