import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '@/templates/Layout';
import SEO from '@/components/SEO';
import ArticleHeader from '@/molecules/ArticleHeading';
import formatDisplayDate from '@/services/formatDisplayDate';
import * as styles from './blog-post.module.css';

const BlogPostTemplate: React.FC<
  PageProps<GatsbyTypes.BlogPostBySlugQuery>
> = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={post?.frontmatter?.title || '記事'}
        description={post?.excerpt}
      />
      <div className={styles.wrapper}>
        <article
          className={styles.inner}
          itemScope
          itemType="http://schema.org/Article"
        >
          <ArticleHeader
            date={formatDisplayDate(post?.frontmatter?.date)}
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
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;
