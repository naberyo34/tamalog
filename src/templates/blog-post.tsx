import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '@/templates/Layout';
import SEO from '@/components/SEO';
import BlogIndexHeading from '@/atoms/BlogIndexHeading';
import ArticleHeading from '@/molecules/ArticleHeading';
import ArticleCard from '@/organisms/ArticleCard';
import formatDisplayDate from '@/services/formatDisplayDate';
import getThumbnail from '@/services/getThumbnail';

import * as styles from './blog-post.module.css';

const BlogPostTemplate: React.FC<
  PageProps<GatsbyTypes.BlogPostAndRelatedPostsQuery>
> = ({ data }) => {
  const post = data.markdownRemark;
  const allPosts = data.allMarkdownRemark;
  const postThumbnail =
    post?.frontmatter?.thumbnail &&
    // @ts-expect-error (typegen都合?) thumbnailの型が合わない
    getImage(post.frontmatter.thumbnail);
  const relatedPosts = allPosts.nodes.filter((target) => {
    const targetTitle = target.frontmatter?.title;
    const postTitle = post?.frontmatter?.title;
    const targetTags = target.frontmatter?.tags;
    const postTags = post?.frontmatter?.tags;

    // 表示中の記事と同一の記事は省く
    if (targetTitle === postTitle) return false;

    if (targetTags && postTags) {
      let matchCounter = 0;

      // 表示中の記事と2つ以上同じタグを持っている要素でフィルタリングする
      targetTags.forEach((targetTag) => {
        if (postTags.includes(targetTag)) {
          matchCounter += 1;
        }
      });

      if (matchCounter > 1) return true;
    }

    return false;
  });

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
      {relatedPosts.length !== 0 && (
        <nav className={styles.relatedPostsWrapper}>
          <BlogIndexHeading label="関連記事" />
          <ol className={styles.relatedPostsInner}>
            {relatedPosts.map((relatedPost) => {
              const title =
                relatedPost.frontmatter?.title || relatedPost.fields?.slug;
              const relatedPostThumbnail =
                relatedPost.frontmatter?.thumbnail &&
                // @ts-expect-error (typegen都合?) thumbnailの型が合わない
                getImage(relatedPost.frontmatter.thumbnail);
              const relatedThumbnail =
                relatedPostThumbnail ||
                getThumbnail(relatedPost.frontmatter?.tags);

              return (
                <li key={title} className={styles.relatedPost}>
                  <ArticleCard
                    img={relatedThumbnail}
                    date={formatDisplayDate(relatedPost.frontmatter?.date)}
                    tags={relatedPost.frontmatter?.tags}
                    title={title || ''}
                    excerpt={relatedPost.excerpt || ''}
                    to={relatedPost.fields?.slug || ''}
                  />
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostAndRelatedPosts($id: String!) {
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
