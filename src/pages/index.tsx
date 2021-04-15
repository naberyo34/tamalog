import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '@/templates/Layout';
import ArticleCard from '@/organisms/ArticleCard';
import * as styles from './index.module.css';

const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
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
      <nav>
        <ol className={styles.articles}>
          {posts.map((post) => {
            const title = post.frontmatter?.title || post.fields?.slug;

            return (
              <li key={title}>
                <ArticleCard
                  date={post.frontmatter?.date || ''}
                  tag={post.frontmatter?.tag || ''}
                  title={title || ''}
                  excerpt={post.excerpt || ''}
                  to={post.fields?.slug || ''}
                />
              </li>
            );
          })}
        </ol>
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
          tag
          title
        }
      }
    }
  }
`;
