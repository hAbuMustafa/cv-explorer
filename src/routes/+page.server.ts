import { json } from '@sveltejs/kit';

async function getCVs() {
  let CVs = [];

  const paths = import.meta.glob('/src/lib/cv-files/*.pdf', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const fileName = path.split('/').at(-1)?.replace(/.pdf$/, '');

    if (file && fileName && typeof file === 'object') {
      const CV = {  fileName, path };
      CVs.push(CV);
    }
  }

  // CVs = CVs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return CVs;
}

export async function load() {
  const CVs = await getCVs();

  console.log(CVs);

  return {
    CVs,
  };
}
