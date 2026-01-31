const { createClient } = require('@sanity/client');

const projectId = process.env.SANITY_PROJECT_ID || process.env.REACT_APP_SANITY_PROJECT_ID || 'nbusimoo';
const dataset = process.env.SANITY_DATASET || process.env.REACT_APP_SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || process.env.REACT_APP_SANITY_API_VERSION || '2023-10-01';
const token = process.env.SANITY_API_TOKEN;

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const isValidEmail = (email) =>
  typeof email === 'string' &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!token) {
    return res
      .status(500)
      .json({ message: 'Sanity API token is not configured on the server.' });
  }

  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON payload.' });
    }
  }

  const name = payload?.name?.trim();
  const email = payload?.email?.trim();
  const message = payload?.message?.trim();

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields (name, email, message) are required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    await sanityClient.create({
      _type: 'contact',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    });

    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Unable to submit contact form', error);
    return res.status(500).json({ message: 'Unable to submit the form right now. Please try again later.' });
  }
};
