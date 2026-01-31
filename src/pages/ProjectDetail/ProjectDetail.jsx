import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft, AiFillGithub } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { PortableText } from '@portabletext/react';

import { client, urlFor } from '../../client';
import './ProjectDetail.scss';

const isPortableTextArray = (value) =>
  Array.isArray(value) &&
  value.some(
    (item) =>
      item &&
      typeof item === 'object' &&
      (item._type === 'block' || Array.isArray(item.children))
  );

const buildDetailBlocks = (project) => {
  if (!project) {
    return [];
  }

  const blocks = [];
  const sectionSource = project.detailSections || project.detailSection || [];

  if (Array.isArray(sectionSource) && sectionSource.length > 0) {
    sectionSource.forEach((section, index) => {
      if (!section) return;
      if (typeof section === 'string') {
        blocks.push({
          key: `detail-string-${index}`,
          heading: null,
          body: section,
        });
      } else {
        blocks.push({
          key: section._key || `detail-object-${index}`,
          heading: section.heading || section.title || null,
          body: section.body || section.description || section.copy || '',
        });
      }
    });
  }

  const singleDetail =
    project.details ||
    project.detail ||
    project.longDescription ||
    project.overview ||
    project.description;

  if (!blocks.length && singleDetail) {
    if (Array.isArray(singleDetail)) {
      if (isPortableTextArray(singleDetail)) {
        blocks.push({
          key: 'detail-portable-text',
          heading: null,
          body: singleDetail,
        });
      } else {
        singleDetail.forEach((detail, index) => {
          blocks.push({
            key: `detail-mixed-${index}`,
            heading: detail?.heading || detail?.title || null,
            body:
              detail?.body ||
              detail?.description ||
              (typeof detail === 'string' ? detail : ''),
          });
        });
      }
    } else {
      blocks.push({
        key: 'detail-fallback',
        heading: null,
        body: singleDetail,
      });
    }
  }

  return blocks.filter((block) => block.body);
};

const getVideoEmbedUrl = (rawUrl) => {
  if (!rawUrl) return null;

  const url = rawUrl.trim();
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  return url;
};

const renderDetailBody = (content) => {
  if (!content) return null;

  if (typeof content === 'string') {
    return <p>{content}</p>;
  }

  if (Array.isArray(content)) {
    return <PortableText value={content} />;
  }

  if (typeof content === 'object') {
    if (Array.isArray(content.children) || content._type) {
      return <PortableText value={[content]} />;
    }

    if (content.text || content.body) {
      return <p>{content.text || content.body}</p>;
    }
  }

  return null;
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError('');

    client
      .fetch(
        `*[_type == "works" && slug.current == $slug][0]{
          ...,
          video{
            ...,
            asset->{
              _id,
              url,
              mimeType
            }
          }
        }`,
        { slug }
      )
      .then((data) => {
        setProject(data);
        if (!data) {
          setError('Project not found.');
        }
      })
      .catch(() => setError('Unable to load project details right now.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const introText = useMemo(() => {
    if (!project) return '';
    return (
      project.introduction ||
      project.shortIntro ||
      project.summary ||
      project.subtitle ||
      project.description ||
      ''
    );
  }, [project]);

  const detailBlocks = useMemo(() => buildDetailBlocks(project), [project]);
  const embedUrl = useMemo(
    () =>
      getVideoEmbedUrl(project?.videoUrl || project?.youtubeUrl || project?.demoVideo),
    [project]
  );
  const uploadedVideo = useMemo(() => {
    const url = project?.video?.asset?.url;
    if (!url) return null;

    return {
      url,
      mimeType: project?.video?.asset?.mimeType,
    };
  }, [project]);

  const heroImage = project?.coverImage || project?.imgUrl;
  const galleryImages = useMemo(() => {
    if (!Array.isArray(project?.galleryImages)) {
      return [];
    }
    return project.galleryImages.filter((image) => image && image.asset);
  }, [project]);

  if (loading) {
    return (
      <div className="project-detail project-detail__state">
        <p className="p-text">Loading project…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-detail project-detail__state">
        <button type="button" className="project-detail__back" onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft />
          Back
        </button>
        <p className="p-text">{error}</p>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="project-detail">
      <header className="project-detail__hero">
        <div className="project-detail__meta">
          <button type="button" className="project-detail__back" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft />
            Back
          </button>
          {project.codeLink && (
            <a
              className="project-detail__code btn btn--ghost"
              href={project.codeLink}
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub />
              View Code
            </a>
          )}
        </div>
        <div className="project-detail__hero-content">
          <div>
            <p className="project-detail__label">Project</p>
            <h1>{project.title}</h1>
            {introText && <p className="project-detail__intro">{introText}</p>}
          </div>
          {project.projectLink && (
            <a
              className="project-detail__launch"
              href={project.projectLink}
              target="_blank"
              rel="noreferrer"
            >
              Launch Project
              <HiOutlineExternalLink />
            </a>
          )}
        </div>
      </header>

      {(embedUrl || uploadedVideo?.url) && (
        <section className="project-detail__video">
          <h2>Demo Walkthrough</h2>
          <div className="project-detail__video-frame">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${project.title} demo`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls playsInline>
                <source src={uploadedVideo.url} type={uploadedVideo.mimeType || 'video/mp4'} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </section>
      )}

      {heroImage && !embedUrl && !uploadedVideo?.url && (
        <section className="project-detail__media">
          <img src={urlFor(heroImage)} alt={project.title} />
        </section>
      )}

      <section className="project-detail__body">
        <h2>Project Details</h2>
        {detailBlocks.length ? (
          detailBlocks.map((block) => (
            <article key={block.key} className="project-detail__block">
              {block.heading && <h3>{block.heading}</h3>}
              {renderDetailBody(block.body)}
            </article>
          ))
        ) : (
          <p className="p-text">More details coming soon.</p>
        )}
      </section>

      {galleryImages.length > 0 && (
        <section className="project-detail__gallery">
          <h2>Project Photo Gallery</h2>
          <div className="project-detail__gallery-grid">
            {galleryImages.map((image, index) => (
              <figure key={image._key || `gallery-image-${index}`}>
                <img
                  src={urlFor(image).fit('max').width(1200).url()}
                  alt={`${project.title} preview ${index + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;
