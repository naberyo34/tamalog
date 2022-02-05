import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '@/templates/Layout';
import SEO from '@/components/SEO';
import ArticleHeading from '@/molecules/ArticleHeading';
import ShareButtons from '@/organisms/ShareButtons';
import RelatedPosts from '@/organisms/RelatedPosts';
import formatDisplayDate from '@/services/formatDisplayDate';
import * as styles from './blog-post.module.css';

const BlogPostTemplate: React.FC<PageProps<GatsbyTypes.BlogPostQuery>> = ({
  location,
  data,
}) => {
  const siteUrl = data.site?.siteMetadata?.url;
  const canonicalUrl = siteUrl ? `${siteUrl}${location.pathname}` : '';
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
        canonicalUrl={canonicalUrl}
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
            <div className={styles.thumbnailWrapper}>
              <GatsbyImage image={postThumbnail} alt="" />
            </div>
          )}
          {post?.tableOfContents && (
            <section className={styles.toc}>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.tableOfContents || '',
                }}
                className={styles.tocInner}
              />
            </section>
          )}
          <section
            dangerouslySetInnerHTML={{ __html: post?.html || '' }}
            itemProp="articleBody"
            className={styles.section}
          />
          <div className={styles.shareButtonsWrapper}>
            <ShareButtons url={canonicalUrl} />
          </div>
        </article>
      </div>
      <RelatedPosts
        title={post?.frontmatter?.title}
        tags={post?.frontmatter?.tags}
      />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPost($id: String!) {
    site {
      siteMetadata {
        url
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
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
