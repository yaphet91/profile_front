import React, { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      setFormError('Please complete all fields before sending your message.');
      return;
    }

    setLoading(true);
    setFormError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Contact endpoint is unavailable. Run `vercel dev` locally or deploy to Vercel.');
        }
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error?.message || 'Unable to send your message.');
      }

      setIsFormSubmitted(true);
      setFormError('');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormError(error.message || 'Unable to send your message right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">Contact me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:yafietaron361@gmail.com" className="p-text">yafietaron361@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+8617200386437" className="p-text">+86 172 0038 6437</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
              disabled={loading}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              disabled={loading}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
              disabled={loading}
            />
          </div>
          {formError && (
            <p className="app__footer-error" role="alert">
              {formError}
            </p>
          )}
          <button
            type="button"
            className="p-text"
            onClick={handleSubmit}
            disabled={loading}
          >
            {!loading ? 'Send Message' : 'Sending...'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
