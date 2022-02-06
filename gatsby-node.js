const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  const miniCssExractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
  );
  if (miniCssExractPlugin) {
    miniCssExractPlugin.options.ignoreOrder = true;
  }
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};

/**
 * ページ生成
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`./src/templates/blog-post/index.tsx`);
  const tagsTemplate = path.resolve(`./src/templates/tags/index.tsx`);
  const result = await graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        tags: allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___tags) {
            tag: fieldValue
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(`記事ページ生成に失敗しました`, result.errors);
    return;
  }

  const posts = result.data.posts.nodes;
  const tags = result.data.tags.group;

  // 取得した記事IDの数だけ記事ページを作る
  if (posts.length > 0) {
    posts.forEach((post) => {
      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          id: post.id,
        },
      });
    });
  }

  // 取得したタグの数だけタグページを作る
  if (tags.length > 0) {
    tags.forEach((tag) => {
      createPage({
        path: `tags/${tag.tag}`,
        component: tagsTemplate,
        context: {
          tag: tag.tag,
        },
      });
    });
  }
};

/**
 * GraphQLのqueryでデータ取得を行うための定義
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

/**
 * GraphQLの型定義
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      title: String
      description: String
      url: String
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      tags: [String]
      date: String
    }

    type Fields {
      slug: String
    }
  `);
};
