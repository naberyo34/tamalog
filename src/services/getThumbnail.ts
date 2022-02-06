import thumbProgramming from '@/images/thumbnail_programming.png';
import thumbIllust from '@/images/thumbnail_illust.png';
import diaryIllust from '@/images/thumbnail_diary.png';

/**
 * tagsに含まれるタグを調べて、対応するサムネイル画像を返す
 * @param tags 記事のタグ配列
 * @returns 画像パス
 */
const getThumbnail = (tags?: readonly GatsbyTypes.Maybe<string>[]): string => {
  if (!tags || tags.length === 0) return '';
  if (tags.includes('プログラミング')) return thumbProgramming;
  if (tags.includes('イラスト')) return thumbIllust;
  if (tags.includes('雑記')) return diaryIllust;

  return '';
};

export default getThumbnail;
