import React from 'react';
import { graphql, PageProps, Link } from 'gatsby';
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
  const programmingPosts = posts.filter((post) => {
    const tags = post.frontmatter?.tags;
    if (!tags) return false;

    return tags.includes('プログラミング');
  });
  const latestProgrammingPosts = programmingPosts.slice(0, 6);
  const otherPosts = posts.filter((post) => {
    const tags = post.frontmatter?.tags;
    if (!tags) return false;

    return !tags.includes('プログラミング');
  });
  const latestOtherPosts = otherPosts.slice(0, 3);

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
        <BlogIndexHeading>プログラミング</BlogIndexHeading>
        <ol className={styles.latestArticles}>
          {latestProgrammingPosts.map((post) => {
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
        <div className={styles.moreLinkWrapper}>
          <Link to="/categories/programming">
            プログラミングの記事をもっと見る
          </Link>
        </div>
        <div className={styles.articlesWrapper}>
          <BlogIndexHeading>その他の記事</BlogIndexHeading>
          <ol className={styles.latestArticles}>
            {latestOtherPosts.map((post) => {
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
          {/* <div className={styles.moreLinkWrapper}>
            <Link to="/categories/all">
              すべての記事をもっと見る
            </Link>
          </div> */}
        </div>
      </nav>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query ProgrammingIndex {
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
