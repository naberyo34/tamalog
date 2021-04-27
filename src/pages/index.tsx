import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import SEO from '@/components/SEO';
import Layout from '@/templates/Layout';
import BlogIndexHeading from '@/atoms/BlogIndexHeading';
import ArticleCard from '@/organisms/ArticleCard';
import formatDisplayDate from '@/services/formatDisplayDate';
import getThumbnail from '@/services/getThumbnail';

import * as styles from './index.module.css';

const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
}) => {
  const posts = data.allMarkdownRemark.nodes;
  const latestPosts = posts.slice(0, 6);
  const previousPosts = posts.slice(6);

  if (posts.length === 0) {
    return (
      <Layout>
        <p>ブログ記事がありません</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="TOP" />
      <nav>
        <BlogIndexHeading label="新着記事" />
        <ol className={styles.latestArticles}>
          {latestPosts.map((post) => {
            const title = post.frontmatter?.title || post.fields?.slug;
            const postThumbnail =
              post.frontmatter?.thumbnail &&
              // @ts-expect-error (typegen都合?) thumbnailの型が合わない
              getImage(post.frontmatter.thumbnail);
            const thumbnail =
              postThumbnail || getThumbnail(post.frontmatter?.tags);

            return (
              <li key={title}>
                <ArticleCard
                  img={thumbnail}
                  date={formatDisplayDate(post.frontmatter?.date)}
                  tags={post.frontmatter?.tags}
                  title={title || ''}
                  excerpt={post.excerpt || ''}
                  to={post.fields?.slug || ''}
                />
              </li>
            );
          })}
        </ol>
        {previousPosts.length !== 0 && (
          <div className={styles.previousArticlesWrapper}>
            <BlogIndexHeading label="過去記事" />
            <ol className={styles.previousArticles}>
              {previousPosts.map((post) => {
                const title = post.frontmatter?.title || post.fields?.slug;

                return (
                  <li key={title}>
                    <ArticleCard
                      date={formatDisplayDate(post.frontmatter?.date)}
                      tags={post.frontmatter?.tags}
                      title={title || ''}
                      excerpt={post.excerpt || ''}
                      to={post.fields?.slug || ''}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </nav>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
