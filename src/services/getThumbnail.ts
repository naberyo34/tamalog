import thumbProgramming from '@/images/thumbnail_programming.png';
import thumbIllust from '@/images/thumbnail_illust.png';

/**
 * tagsに含まれるタグを調べて、対応するサムネイル画像を返す
 * @param tags 記事のタグ配列
 * @returns 画像パス
 */
const getThumbnail = (tags?: string[]): string => {
  if (!tags || tags.length === 0) return '';
  if (tags.includes('プログラミング')) return thumbProgramming;
  if (tags.includes('イラスト')) return thumbIllust;

  return '';
};

export default getThumbnail;
