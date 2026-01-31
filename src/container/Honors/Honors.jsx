import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import { StateMessage } from '../../components';

import './Honors.scss';

const Honors = () => {
  const [honors, setHonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = '*[_type == "honors"]';

    setLoading(true);
    setError('');

    client
      .fetch(query)
      .then((data) => {
        setHonors(data || []);
      })
      .catch(() => setError('Unable to load honors at the moment.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h2 className="head-text"><span>Honors</span> & Awards</h2>
      {loading && <StateMessage message="Loading honors…" />}
      {!loading && error && <StateMessage message={error} tone="error" />}
      {!loading && !error && honors.length === 0 && (
        <StateMessage message="No honors have been published yet." />
      )}
      {!loading && !error && honors.length > 0 && (
        <div className="app__honors-container">
            <div className="app__honors-list">
              {honors.map((honor, index) => (
                <motion.div
                  className="app__honors-item"
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, type: 'tween' }}
                  key={honor.name + index}
                >
                  {honor.imgUrl && (
                    <div className='image list_inside'>
                      <img
                        src={urlFor(honor.imgUrl)}
                        alt={honor.name}
                      />
                    </div>
                  )}
                  <div className='year list_inside'>
                    {honor.year}</div>
                  <div className='bold-text list_inside'>
                    {honor.name}</div>
                  <div className='company list_inside'>
                    {honor.company}</div>
                  <div className='description list_inside'>
                    {honor.desc}</div>

                </motion.div>
              ))}
            </div>
          </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Honors, 'app__honors'),
  'honors',
  'app__whitebg',
);
