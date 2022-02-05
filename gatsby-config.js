module.exports = {
  siteMetadata: {
    title: `tamalog`,
    description: `tama / Ryo Watanabe の備忘ブログ`,
    url: `https://tamalog.szmd.jp`,
    twitter: `@momochitama`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-typegen`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-og-image`,
            options: {
              output: {
                directory: '',
                fileName: 'og_dynamic.png',
              },
              image: {
                width: 1200,
                height: 630,
                backgroundImage: require.resolve('./src/images/og_dynamic.png'),
              },
              style: {
                title: {
                  fontFamily: 'Noto Sans JP',
                  fontColor: '#3a3a3a',
                  fontWeight: 'bold',
                  fontSize: 56,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 56,
                  paddingRight: 56,
                },
                author: {
                  fontFamily: 'Noto Sans JP',
                  fontColor: '#3a3a3a',
                  fontWeight: 'bold',
                  fontSize: 16,
                },
              },
              meta: {
                title: '',
                author: '',
              },
              fontFile: [
                {
                  path: require.resolve('./src/styles/NotoSansJP-Bold.otf'),
                  family: 'Noto Sans JP',
                  weight: 'bold',
                },
              ],
              iconFile: require.resolve('./src/images/dummy.png'),
              timeout: 10000,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-top: 2em`,
            },
          },
          {
            resolve: `gatsby-remark-external-links`,
          },
          // see: https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/
          // remark-prismjs より前に配置が必要
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // note: mdファイル内でのinternal linkをSPAルーティングに変換してくれる
    `gatsby-plugin-catch-links`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    tableOfContents
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      tags
                      thumbnail {
                        childImageSharp {
                          gatsbyImageData(width: 300)
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
