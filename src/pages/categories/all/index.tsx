import React from 'react';
import { graphql, PageProps } from 'gatsby';
import SEO from '@/components/SEO';
import Layout from '@/templates/Layout';
import BlogIndexHeading from '@/atoms/BlogIndexHeading';
import ArticleInformation from '@/molecules/ArticleInformation';
import formatDisplayDate from '@/services/formatDisplayDate';

import * as styles from './index.module.css';

const BlogIndex: React.FC<PageProps<GatsbyTypes.AllIndexQuery>> = ({
  data,
}) => {
  const posts = data.allMarkdownRemark.nodes;

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
        <section className={styles.articles}>
          <BlogIndexHeading>すべての記事</BlogIndexHeading>
          <ol className={styles.articles}>
            {posts.map((post) => {
              const title = post.frontmatter?.title || post.fields?.slug;

              return (
                <li key={title} className={styles.article}>
                  <ArticleInformation
                    date={formatDisplayDate(post.frontmatter?.date)}
                    tags={post.frontmatter?.tags || []}
                    title={title || ''}
                    excerpt={post.excerpt || ''}
                    to={post.fields?.slug || ''}
                  />
                </li>
              );
            })}
          </ol>
        </section>
      </nav>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query AllIndex {
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
