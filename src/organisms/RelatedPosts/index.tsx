import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import BlogIndexHeading from '@/atoms/BlogIndexHeading';
import ArticleCard from '@/organisms/ArticleCard';
import formatDisplayDate from '@/services/formatDisplayDate';
import getThumbnail from '@/services/getThumbnail';
import * as styles from './index.module.css';

type Props = {
  title: GatsbyTypes.Maybe<string>;
  tags: GatsbyTypes.Maybe<readonly GatsbyTypes.Maybe<string>[]>;
};

const RelatedPosts: React.FC<Props> = ({ title, tags }) => {
  const allPosts: GatsbyTypes.RelatedPostsQuery = useStaticQuery<GatsbyTypes.RelatedPostsQuery>(graphql`
    query RelatedPosts {
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
  `);
  const relatedPosts = allPosts.allMarkdownRemark.nodes.filter((target) => {
    const targetTitle = target.frontmatter?.title;
    const targetTags = target.frontmatter?.tags;

    // 表示中の記事と同一の記事は省く
    if (targetTitle === title) return false;

    if (targetTags) {
      let matchCounter = 0;

      // 表示中の記事と2つ以上同じタグを持っている要素でフィルタリングする
      targetTags.forEach((targetTag) => {
        if (tags && tags.includes(targetTag)) {
          matchCounter += 1;
        }
      });

      if (matchCounter > 1) return true;
    }

    return false;
  });

  return (
    <>
      {relatedPosts.length !== 0 && (
        <nav className={styles.wrapper}>
          <BlogIndexHeading label="関連記事" />
          <ol className={styles.inner}>
            {relatedPosts.map((relatedPost) => {
              const relatedPostTitle =
                relatedPost.frontmatter?.title || relatedPost.fields?.slug;
              const relatedPostThumbnail =
                relatedPost.frontmatter?.thumbnail &&
                // @ts-expect-error (typegen都合?) thumbnailの型が合わない
                getImage(relatedPost.frontmatter.thumbnail);
              const relatedThumbnail =
                relatedPostThumbnail ||
                getThumbnail(relatedPost.frontmatter?.tags);

              return (
                <li key={relatedPostTitle} className={styles.post}>
                  <ArticleCard
                    img={relatedThumbnail}
                    date={formatDisplayDate(relatedPost.frontmatter?.date)}
                    tags={relatedPost.frontmatter?.tags}
                    title={relatedPostTitle || ''}
                    excerpt={relatedPost.excerpt || ''}
                    to={relatedPost.fields?.slug || ''}
                  />
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
};

export default RelatedPosts;
