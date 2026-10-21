import { getCollection } from 'astro:content';
export const getPosts = async () => (await getCollection('posts', ({ data }) => !data.draft))
  .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
export const getProjects = async () => (await getCollection('projects', ({ data }) => !data.draft))
  .sort((a, b) => b.data.year.localeCompare(a.data.year));
export const formatDate = (date: Date) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(date).replaceAll('-', '.');
