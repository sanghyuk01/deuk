import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';
export async function GET(context: APIContext) {
  return rss({ title: 'deuk · 표상혁의 기술 기록', description: '웹 서비스를 만들며 마주한 문제와 해결 과정을 기록합니다.', site: context.site!, items: (await getPosts()).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.publishedAt, link: `/posts/${post.id}/` })), customData: '<language>ko-kr</language>' });
}
