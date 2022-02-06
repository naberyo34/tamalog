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

const Top: React.FC<PageProps<GatsbyTypes.TopIndexQuery>> = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const programmingPosts = posts.filter((post) => {
    const tags = post.frontmatter?.tags;
    if (!tags) return false;

    return tags.includes('プログラミング');
  });
  const latestProgrammingPosts = programmingPosts.slice(0, 9);
  const otherPosts = posts.filter((post) => {
    const tags = post.frontmatter?.tags;
    if (!tags) return false;

    return !tags.includes('プログラミング');
  });
  const latestOtherPosts = otherPosts.slice(0, 6);

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
      <section className={styles.articles}>
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
          <Link to="/tags/プログラミング">
            プログラミングの記事をもっと見る
          </Link>
        </div>
      </section>
      <section className={styles.articles}>
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
        <div className={styles.moreLinkWrapper}>
          <Link to="/all">すべての記事を見る</Link>
        </div>
      </section>
    </Layout>
  );
};

export default Top;

export const pageQuery = graphql`
  query TopIndex {
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
