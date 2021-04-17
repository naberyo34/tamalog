import React from 'react';
import { graphql, PageProps } from 'gatsby';
import SEO from '@/components/SEO';
import Layout from '@/templates/Layout';
import ArticleCard from '@/organisms/ArticleCard';
import formatDisplayDate from '@/services/formatDisplayDate';
import getThumbnail from '@/services/getThumbnail';

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
      <SEO title="TOP" />
      <nav>
        <ol className={styles.articles}>
          {posts.map((post) => {
            const title = post.frontmatter?.title || post.fields?.slug;
            // @ts-expect-error gatsby-plugin-typegenの問題で配列を渡すときにエラーが出るため
            const thumbnail = getThumbnail(post.frontmatter?.tags);

            return (
              <li key={title}>
                <ArticleCard
                  img={thumbnail}
                  date={formatDisplayDate(post.frontmatter?.date)}
                  // @ts-expect-error gatsby-plugin-typegenの問題で配列を渡すときにエラーが出るため
                  tags={post.frontmatter?.tags || []}
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
          tags
          title
        }
      }
    }
  }
`;
