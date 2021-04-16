/**
 * GraphQLで取得した日付を表示用に整形する
 * @param rawDate 取得した日付 (取得に失敗している場合は '投稿日不明' を返す)
 * @returns '投稿日不明' | 'YY.MM.DD'
 */
const formatDisplayDate = (rawDate?: string): string => {
  if (!rawDate) return '投稿日不明';

  const year = rawDate.slice(0, 4);
  const month = rawDate.slice(4, 6);
  const day = rawDate.slice(6);
  const formatDate = `${year}.${month}.${day}`;

  return formatDate;
};

export default formatDisplayDate;
