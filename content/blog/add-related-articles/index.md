---
title: "ブログに関連記事表示機能をつけた"
date: "20210429"
tags: ["プログラミング", "Gatsby"]
---

あとで忘れそうな実装のメモをいっそブログの記事にしてしまうことでアウトプットのハードルを下げていくスタイル。

今回はこのブログの記事末尾に関連記事表示機能をつけてみた。関連記事といっても記事の内容を読み取って判定するようなものではなく、

- 表示中の記事と2つ以上タグが重複する記事を一覧表示するだけ

というとても簡素なものだ。

## GraphQLクエリの追加

投稿記事を表示するテンプレートファイルにはもともと表示する記事のみを取得するクエリを書いていたのだが、そこに「全件取得」のクエリを追加した。

```typescript
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
    // 追加分
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
```

`markdownRemark`は実際に表示する記事のデータ、`allMarkdownRemark`のほうはとりあえず全件のデータを取ってきている。ちょっと大仰な気がしなくもないが、動作上の影響を受けるのはビルドのときくらいなのでいったんこれで進めることにした。

## 絞り込みの処理をReactコンポーネント内に書く

「GraphQLクエリの時点で絞り込めないのか？」とは思っているのだが、

- `markdownRemark`内に値のある「実際に表示する記事」のタグを使って、さらに関連記事を取得してくるためのクエリを走らせる

という二段階の処理はできないような気がする（自信なし）。今回はいったんコンポーネント側でフィルタリング処理を書くことにした。

```typescript
const BlogPostTemplate: React.FC<
  PageProps<GatsbyTypes.BlogPostAndRelatedPostsQuery>
> = ({ data }) => {
  const post = data.markdownRemark;
  const allPosts = data.allMarkdownRemark;
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

  // 後略
```

これで関連記事の配列が取得できるので、あとは`relatedPosts`をJSXで出力するだけだ。

## おわりに

今回の趣旨とは逸れるが、

> 記事の内容を読み取って判定する

こういったロジックを持った「関連記事」機能を実装するのも面白そうではある。気が向いたら挑戦してみたい。
