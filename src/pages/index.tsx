import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import Header from 'organisms/Header';

const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
}) => {
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return <p>ブログ記事がありません</p>;
  }

  return (
    <>
      <Header />
      <ol>
        {posts.map((post) => {
          const title = post.frontmatter?.title || post.fields?.slug;

          return (
            <li key={post.fields?.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <h2>
                  <Link to={post.fields?.slug || ''} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <small>{post.frontmatter?.date}</small>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt || '',
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date
          title
        }
      }
    }
  }
`;
