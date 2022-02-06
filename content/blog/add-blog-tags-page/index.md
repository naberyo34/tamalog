---
title: "ブログにタグページを実装した"
date: "20220206"
tags: ["プログラミング", "Gatsby"]
thumbnail: 'thumbnail.png'
---

長らく当ブログの「タグ」機能は見せかけで、タグごとのページ一覧を表示する機能がありませんでした。

今回はGatsbyの機能を用いて、たとえば[このページ](/tags/プログラミング)のようにタグごとのページを自動生成する改修を行いました。

## 参考資料

- [Gatsby製のブログにタグ機能を追加するための方法を見直してみよう](https://blog.ojisan.io/gatsby-create-tag/)

この記事がとてもわかりやすく、多くの部分で参考にしています。本記事は私の手元の環境に合わせて書いているので、併せて参考にしてみてください。

## gatsby-node.jsでページ生成を行う

Gatsbyで動的なページ生成を行う際のキモとなるのが`gatsby-node.js`です。ファイル内の`createPages`で、

- ページ生成に使うテンプレートを読み込む
- GraphQLでmarkdownファイルからコンテンツ情報を取得
- パスを指定し、ページを生成

する処理を行います。まずは、当ブログの`createPages`を丸ごと掲載します。

### gatsby-node.js

```js
/**
 * ページ生成
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // 記事ページで使うテンプレート
  const blogPostTemplate = path.resolve(`./src/templates/blog-post/index.tsx`);
  // タグページで使うテンプレート
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
```

上記では「記事ページ（記事そのもの）」と、「タグページ（タグごとに記事を一覧表示する）」を生成しています。このうち「タグページ」に関する部分は今回の作業で追加したものです。

```js
// タグページで使うテンプレート
const tagsTemplate = path.resolve(`./src/templates/tags/index.tsx`);
```

```js
const result = await graphql(
    `
      {
        // ... 
        tags: allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___tags) {
            tag: fieldValue
          }
        }
      }
    `,
  );
```

```js
const tags = result.data.tags.group;

// ...

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
```

上から

- ページ生成に使うテンプレートファイルを読み込む
- GraphQLで**コンテンツ内に存在するすべてのタグ**を取得
- 各種設定を渡し、実際にページを作る

という記述です。これによって、`tags/[タグ名]`というパスで一覧ページが生成されるようになります。

## テンプレートファイルを作る

上記で読み込んでいるテンプレートファイル、`src/templates/tags/index.tsx`は新たに作成が必要です。実際のコードは本筋と関係のないコードで少しごちゃっとしているため簡略化すると、下記のような内容です。

### src/templates/tags/index.tsx

```jsx
const TagIndexTemplate: React.FC<PageProps<GatsbyTypes.TagIndexQuery>> = ({
  location,
  data,
  pageContext,
}) => {
  const posts = data.allMarkdownRemark.nodes;
  // pageContext からタグの文字列を受け取る
  const tag = pageContext.tag;

  return (
    <section>
      <BlogIndexHeading>{tag}</BlogIndexHeading>
      <div className={styles.articlesWrapper}>
        <ol className={styles.articles}>
          {/* 取得した記事を一覧表示する */}
          {posts.map((post) => {
            const title = post.frontmatter?.title || post.fields?.slug;
            return (
              <li key={title}>
                {/*  ↓は記事の情報とリンクを表示するためのコンポーネント */}
                <ArticleCard
                  date={formatDisplayDate(post.frontmatter?.date)}
                  tags={post.frontmatter?.tags || []}
                  title={title || ''}
                  excerpt={post.excerpt || ''}
                  to={post.fields?.slug || ''}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default TagIndexTemplate;

export const pageQuery = graphql`
  query TagIndex($tag: String!) {
    site {
      siteMetadata {
        url
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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
```

JSXは単に「取得した記事をループで出力しているだけ」なので、特筆する点は`pageContext`でタグ名を取得している部分くらいです。

重要なのは`pageQuery`のほうで、`$tag`という**変数**を用いてクエリを取得しています。
この変数は`gatsby-node.js`側で`context`として渡しているもので、

- `tags/プログラミング`では`プログラミング`のタグを持つ記事を絞り込んで取得

という処理が実現できます。

## gatsby-node.jsのクエリとテンプレートファイル内のクエリの違い

わかってしまえばなんてことはないのですが、私は最初「`gatsby-node.js`側のGraphQLクエリ」と「テンプレート側のGraphQLクエリ」の違いや使い分けがわからず少し混乱しました。

改めてこの2つがやっていることを整理すると、

- `gatsby-node.js`は、GraphQLで得た情報を元に「**どんなパスでどんなページを作ればよいか**」を判断して、作成する
- テンプレートファイルは、実際に作成されたページの**中**で必要な情報を改めて取得する

という違いがあります。今回のタグページでは、

- `gatsby-node.js`は**すべてのタグ情報**を取得して、タグの数だけページを作る
- テンプレートファイルは、該当するタグを持つ**記事の情報(タイトル、slugなど)** を取得して、ページ内に展開する

処理をしています。この違いがわかると、タグページ以外にも動的にページ生成を行いたい場面で迷わず実装が進められると思います。

## おわりに

少しずつブログらしい体裁が整ってきました。今後もいい感じにしていきたいです。
