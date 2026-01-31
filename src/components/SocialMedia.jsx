import React from 'react';
import { BsInstagram, BsGithub, BsFacebook } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href='https://github.com/yaphet91'
        target="_blank" rel="noreferrer">
        <BsGithub />
      </a>
      
    </div>
    <div>
      <a href='https://www.facebook.com/yafiet.aron.1'
        target="_blank" rel="noreferrer">
        <BsFacebook />
      </a>
    </div>
    <div>
      <a href='https://www.instagram.com/japhet_ultimate?utm_source=qr&igsh=MTNhcmdqbnRiMGkxcw=='
        target="_blank" rel="noreferrer">
        <BsInstagram />
      </a>
    </div>
  </div>
);

export default SocialMedia;
