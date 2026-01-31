import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import { StateMessage } from '../../components';
import './Work.scss';

const Work = () => {
  const [filterWork, setFilterWork] = useState([]);
  const animateCard = { y: 0, opacity: 1 };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const query = `*[_type == "works"]{
      _id,
      title,
      description,
      introduction,
      subtitle,
      "slug": slug.current,
      projectLink,
      codeLink,
      imgUrl,
      coverImage,
      tags
    }`;

    setLoading(true);
    setError('');

    client
      .fetch(query)
      .then((data) => {
        const normalized = (data || []).map((item) => {
          const tags = Array.isArray(item?.tags) ? item.tags.filter(Boolean) : [];
          const slugValue =
            typeof item?.slug === 'string' ? item.slug : item?.slug?.current || '';

          return {
            ...item,
            tags,
            slug: slugValue,
            previewImage: item?.imgUrl || item?.coverImage,
          };
        });

        setFilterWork(normalized);
      })
      .catch(() => {
        setError('Unable to load projects right now. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleGoToDetail = (slug) => {
    if (slug) {
      navigate(`/projects/${slug}`);
    }
  };

  return (
    <>
      <h2 className="head-text">My Academic<span> Projects</span> Section</h2>

      {loading && <StateMessage message="Loading highlighted projects…" />}
      {!loading && error && <StateMessage message={error} tone="error" />}
      {!loading && !error && filterWork.length === 0 && (
        <StateMessage message="Projects will be published here soon." />
      )}
      {!loading && !error && filterWork.length > 0 && (
        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className="app__work-portfolio"
        >
          {filterWork.map((work, index) => {
            const primaryTag = Array.isArray(work.tags) ? work.tags[0] : null;
            const displayCopy = work.description || '';
            const projectImage = work.previewImage || work.imgUrl || work.coverImage;

            return (
            <div
              className="app__work-item app__flex"
              key={work?.slug || work?._id || index}
              onClick={() => handleGoToDetail(work.slug)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleGoToDetail(work.slug);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="app__work-img app__flex">
                {projectImage ? (
                  <img src={urlFor(projectImage)} alt={work.title} />
                ) : (
                  <div className="app__work-img--placeholder" aria-hidden="true" />
                )}

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                  className="app__work-hover app__flex"
                >
                  {work.projectLink && (
                    <a
                      href={work.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </a>
                  )}
                  {work.codeLink && (
                    <a
                      href={work.codeLink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillGithub />
                      </motion.div>
                    </a>
                  )}
                </motion.div>
              </div>

              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                {displayCopy && (
                  <p className="p-text" style={{ marginTop: 10 }}>
                    {displayCopy}
                  </p>
                )}

                {primaryTag && (
                  <div className="app__work-tag app__flex">
                    <p className="p-text">{primaryTag}</p>
                  </div>
                )}
              </div>
            </div>
          );
          })}
        </motion.div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'projects',
  'app__primarybg',
);
