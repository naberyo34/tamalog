---
title: "ブログに関連記事表示機能をつけた"
date: "20210505"
tags: ["プログラミング", "Gatsby"]
---

あとで忘れそうな実装のメモをいっそブログの記事にしてしまうことでアウトプットのハードルを下げていくスタイル。

今回はこのブログの記事末尾に関連記事表示機能をつけてみた。関連記事といっても記事の内容を読み取って判定するようなものではなく、

- 表示中の記事と2つ以上タグが重複する記事を一覧表示するだけ

というとても簡素なものだ。

## 関連記事のコンポーネントでStaticQueryを使う

GatsbyにおけるGraphQLクエリには、トップページや記事ページなどの**ページ単位**で利用できる`Page Query`と、コンポーネント単位で利用できる`Static Query`がある。

タグの重複する記事を見つけるために、まずは「関連記事」のコンポーネント内で記事の全件取得を行う。

```typescript
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
  // ...
```

## 絞り込みの処理をReactコンポーネント内に書く

「GraphQLクエリの時点で絞り込めないのか？」と思ったのだが、残念ながら`useStaticQuery`はその名のとおりクエリの値を動的に変えることができない。今回はpropsで受け取った`title`と`tag`を使い、コンポーネント内で絞り込みの処理を行うことにした。

```typescript
// ...
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
// ...
```

これで関連記事の配列が取得できた。あとは`relatedPosts`を`map`で展開し、関連記事のカードを横並びに配置している。

```jsx
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
```

## おわりに

今回の趣旨とは逸れるが、

> 記事の内容を読み取って判定する

こういったロジックを持った「関連記事」機能を実装するのも面白そうではある。気が向いたら挑戦してみたい。
