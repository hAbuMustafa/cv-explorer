const mimeTypes = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
  pdf: 'application/pdf',
};

async function getCVs() {
  let CVs = [];

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
      const CV = { fileName, fileExtension, mimeType: mimeTypes[fileExtension], path };
      CVs.push(CV);
    }
  }

  // CVs = CVs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return CVs;
}

export async function load() {
  const CVs = await getCVs();

  return {
    CVs,
  };
}
