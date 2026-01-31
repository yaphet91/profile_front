import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';
import { StateMessage } from '../../components';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    setLoading(true);
    setError('');

    client
      .fetch(query)
      .then((data) => {
        setAbouts(data || []);
      })
      .catch(() => setError('Unable to load academic background right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h2 className="head-text">My <span>Academic</span> Background</h2>

      {loading && <StateMessage message="Loading academic highlights…" />}
      {!loading && error && <StateMessage message={error} tone="error" />}
      {!loading && !error && abouts.length === 0 && (
        <StateMessage message="Background entries have not been published yet." />
      )}
      {!loading && !error && abouts.length > 0 && (
        <div className="app__profiles">
          {abouts.map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className="app__profile-item"
              key={about.title + index}
            >
              <a href={about.links} target="_blank" rel="noreferrer">
                <img src={urlFor(about.imgUrl)} alt={about.title} />
              </a>
              <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
              <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'education',
  'app__whitebg',
);
