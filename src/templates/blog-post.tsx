import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '@/templates/Layout';
import ArticleHeader from '@/molecules/ArticleHeading';
import * as styles from './blog-post.module.css';

const BlogPostTemplate: React.FC<
  PageProps<GatsbyTypes.BlogPostBySlugQuery>
> = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <div className={styles.wrapper}>
        <article
          className={styles.inner}
          itemScope
          itemType="http://schema.org/Article"
        >
          <ArticleHeader
            date={post?.frontmatter?.date || ''}
            // @ts-expect-error gatsby-plugin-typegenの問題で配列を渡すときにエラーが出るため
            tags={post?.frontmatter?.tags || []}
            title={post?.frontmatter?.title || ''}
          />
          <section
            dangerouslySetInnerHTML={{ __html: post?.html || '' }}
            itemProp="articleBody"
            className={styles.section}
          />
        </article>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;
