import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import Layout from '@/templates/Layout';
import SEO from '@/components/SEO';
import BlogIndexHeading from '@/atoms/BlogIndexHeading';
import ArticleCard2 from '@/organisms/ArticleCard2';
import formatDisplayDate from '@/services/formatDisplayDate';
import getThumbnail from '@/services/getThumbnail';
import * as styles from './index.module.css';

const TagIndexTemplate: React.FC<PageProps<GatsbyTypes.TagIndexQuery>> = ({
  location,
  data,
  pageContext,
}) => {
  const siteUrl = data.site?.siteMetadata?.url;
  const canonicalUrl = siteUrl ? `${siteUrl}${location.pathname}` : '';
  const posts = data.allMarkdownRemark.nodes;
  // @ts-expect-error pageContextの型推論がうまくいかない
  const tag = pageContext.tag as string;

  return (
    <Layout>
      <SEO
        title={tag}
        description={`${tag}の記事`}
        canonicalUrl={canonicalUrl}
      />
      <nav>
        <section>
          <BlogIndexHeading>{tag}</BlogIndexHeading>
          <div className={styles.articlesWrapper}>
            <ol className={styles.articles}>
              {posts.map((post) => {
                const title = post.frontmatter?.title || post.fields?.slug;
                const postThumbnail =
                  post.frontmatter?.thumbnail &&
                  // @ts-expect-error (typegen都合?) thumbnailの型が合わない
                  getImage(post.frontmatter.thumbnail);
                const thumbnail =
                  postThumbnail || getThumbnail(post.frontmatter?.tags);

                return (
                  <li key={title}>
                    <ArticleCard2
                      date={formatDisplayDate(post.frontmatter?.date)}
                      tags={post.frontmatter?.tags || []}
                      title={title || ''}
                      excerpt={post.excerpt || ''}
                      to={post.fields?.slug || ''}
                      img={thumbnail}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </nav>
    </Layout>
  );
};

export default TagIndexTemplate;

export const pageQuery = graphql`
  query TagIndex($tag: String!) {
    site {
      siteMetadata {
        url
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      nodes {
        excerpt(pruneLength: 50, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date
          tags
          title
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`;
