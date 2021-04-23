import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '@/templates/Layout';
import SEO from '@/components/SEO';
import ArticleHeading from '@/molecules/ArticleHeading';
import formatDisplayDate from '@/services/formatDisplayDate';
import * as styles from './blog-post.module.css';

const BlogPostTemplate: React.FC<
  PageProps<GatsbyTypes.BlogPostBySlugQuery>
> = ({ data }) => {
  const post = data.markdownRemark;
  const postThumbnail =
    post?.frontmatter?.thumbnail &&
    // @ts-expect-error (typegen都合?) thumbnailの型が合わない
    getImage(post.frontmatter.thumbnail);

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
          <ArticleHeading
            date={formatDisplayDate(post?.frontmatter?.date)}
            tags={post?.frontmatter?.tags}
            title={post?.frontmatter?.title || ''}
          />
          {postThumbnail && (
            <GatsbyImage
              className={styles.thumbnail}
              image={postThumbnail}
              alt=""
            />
          )}
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
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;
