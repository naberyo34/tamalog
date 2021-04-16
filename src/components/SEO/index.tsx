import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import ogImage from '@/images/og.png';

type Meta = {
  name: string;
  content: string;
};

type Props = {
  title: string;
  description?: string;
  meta?: Meta[];
};

const SEO: React.FC<Props> = ({ title, description, meta }) => {
  const metaArray = meta || [];
  const { site } = useStaticQuery<GatsbyTypes.SeoQuery>(
    graphql`
      query Seo {
        site {
          siteMetadata {
            title
            description
            url
            social {
              twitter
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site?.siteMetadata?.description || '';
  const defaultTitle = site?.siteMetadata?.title;
  const defaultImage = site?.siteMetadata?.url
    ? `${site.siteMetadata.url}${ogImage}`
    : '';

  return (
    <Helmet
      htmlAttributes={{ lang: 'ja' }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : ''}
      // note: 下記は最低限組み込まれるmeta。情報を追加したいときにpropsを渡せばOK
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: defaultTitle ? `${title} | ${defaultTitle}` : title,
        },
        {
          property: `og:site_name`,
          content: defaultTitle || 'tamalog',
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: title === 'TOP' ? `website` : `article`,
        },
        {
          property: `og:image`,
          // todo: 変更可能にする
          content: defaultImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: defaultTitle ? `${title} | ${defaultTitle}` : title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(metaArray)}
    />
  );
};

export default SEO;
