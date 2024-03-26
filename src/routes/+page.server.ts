import type { CvT } from '$lib/types';
import mammoth from 'mammoth';

const mimeTypes = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
  pdf: 'application/pdf',
};

async function getCVs() {
  let CVs = [] as CvT[];

  const paths = import.meta.glob('/src/lib/cv-files/*.*', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const fileName = path.split('/').at(-1)?.replace(/.pdf$/, '');
    const fileExtension = path
      .split('/')
      .at(-1)
      ?.split('.')
      .at(-1) as keyof typeof mimeTypes;

    if (file && fileName && typeof file === 'object') {
      const CV: CvT = {
        fileName,
        fileExtension,
        mimeType: mimeTypes[fileExtension],
        path,
      };

      try {
        if (/^doc[x]?$/.test(CV.fileExtension))
          CV.content = await mammoth
            .convertToHtml({ path: CV.path.replace(/^\/src\//, 'src/') })
            .then((result) => result.value);
      } catch (error) {
        console.error(`Mammoth Error: Reading ${fileName}`, error);
        CV.content = `<strong style="color: red;">ERROR: File format (.${fileExtension}) not supported. Please, use only (.docx) or (.pdf) files.</strong>`;
      }

      CVs.push(CV);
    }
  }

  // CVs = CVs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return CVs;
}

export async function load() {
  const CVs = (await getCVs()) as CvT[];

  return {
    CVs,
  };
}
