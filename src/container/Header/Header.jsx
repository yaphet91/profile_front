import React from 'react';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

const statHighlights = [
  { value: '3.8', label: 'GPA', detail: 'STEM & AP focus' },
  { value: '1530', label: 'SAT', detail: '99th percentile math' },
  { value: '120+', label: 'Service Hours', detail: 'Mentoring & civic tech' },
];

const leadershipHighlights = [
  {
    title: 'AI Research Fellow',
    detail: 'Investigating ethical AI systems for community health.',
  },
  {
    title: 'Cybersecurity Scholar',
    detail: 'Led a student blue team that won a regional hackathon.',
  },
  {
    title: 'STEM Mentor',
    detail: 'Tutored 40+ peers in AP Computer Science & Calculus.',
  },
];

const academicTracks = [
  'Artificial Intelligence',
  'Automation / Robotics',
  'Cyber Security',
  'Human-centered Computing',
  'Software Development'
];

const communitySpotlight = [
  {
    title: 'FIRST Robotics Captain',
    note: 'Built an autonomous navigation stack that earned the Innovation in Control award.',
  },
  {
    title: 'CodePath Scholar',
    note: 'Co-designed a mental-wellness app to support first-gen students.',
  },
];

const collaborators = [
  { logo: images.tensorflow, label: 'TensorFlow' },
  { logo: images.opencv, label: 'Computer Vision' },
  { logo: images.r, label: 'R for Data Analysis' },
  { logo: images.python, label: 'Python Programming' },
  { logo: images.html, label: 'Web content' },
  { logo: images.css, label: 'Web Styling' },
  { logo: images.javascript, label: 'Dynamic programming' },
  { logo: images.react, label: 'Frontend framework' },
];

const Header = () => (
  <div className="app__header">
    <motion.section
      whileInView={{ opacity: [0, 1], y: [40, 0] }}
      transition={{ duration: 0.8, delayChildren: 0.4 }}
      className="app__header-img"
    >
      <div className="profile-visual">
        <img src={images.profile} alt="Yafiet portrait" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="Decorative circle"
          className="overlay_circle"
        />
        <div className="profile-visual__badge">First-gen Scholar</div>
        {/* <div className="profile-visual__badge profile-visual__badge--outline">QuestBridge Finalist</div> */}
      </div>

      <motion.section
      whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
      transition={{ duration: 0.6 }}
      className="app__header-pillars"
    >
      {collaborators.map((group, index) => (
        <div className="pillar-card" key={`${group.label}-${index}`}>
          <img src={group.logo} alt={group.label} />
          <span>{group.label}</span>
        </div>
      ))}
    </motion.section>

    </motion.section>

    <motion.section
      whileInView={{ x: [-60, 0], opacity: [0, 1] }}
      transition={{ duration: 0.6 }}
      className="app__header-info"
    >
      <div className="hero-card">
        <p className="hero-card__eyebrow">CS Major Applicant · AI Visionary</p>
        <h1 className="hero-card__title">Hi, I&apos;m Yafiet. I’m here to build the next gen human-centered AI.</h1>
        <p className="hero-card__copy">
          I believe the best tech is built by those who refuse to leave anyone behind. My focus is pairing
          cutting-edge ML research with ironclad cyber resilience. I’m ready to bring that drive to a
          campus where I can innovate, mentor, and tackle the hardest challenges in ethical
          computing head-on.
        </p>
        <div className="focus-tags">
          {academicTracks.map((track) => (
            <span key={track}>{track}</span>
          ))}
        </div>
        <div className="hero-card__actions">
          <a href="#contact" className="btn btn--primary">
            Get in touch
          </a>
          <a href="#projects" className="btn btn--ghost">
            View my projects
          </a>
        </div>
      </div>

      <div className="stat-grid">
        {statHighlights.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-card__value">{stat.value}</span>
            <span className="stat-card__label">{stat.label}</span>
            <span className="stat-card__detail">{stat.detail}</span>
          </div>
        ))}
      </div>

      <div className="highlight-grid">
        {leadershipHighlights.map((highlight) => (
          <div key={highlight.title} className="highlight-card">
            <h3>{highlight.title}</h3>
            <p>{highlight.detail}</p>
          </div>
        ))}
      </div>

      <div className="profile-highlights">
        <h4>Community Impact</h4>
        <ul>
          {communitySpotlight.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>

  </div>
);

export default AppWrap(Header, 'home');
