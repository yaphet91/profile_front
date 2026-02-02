import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient } from '@sanity/client';

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || 'nbusimoo';
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production';
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION || '2023-10-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.REACT_APP_SANITY_USE_CDN !== 'false',
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
};
