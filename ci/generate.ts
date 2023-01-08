import * as ConcourseTs from '@decentm/concourse-ts';
import fs from 'node:fs/promises';
import path from 'node:path';

import createMainPipeline from './pipelines/main';

const outDir = path.resolve(__dirname, '.ci');

const writePipeline = async (pipeline: ConcourseTs.Pipeline) => {
  const yaml = ConcourseTs.compile(pipeline);
  const outPath = path.join(outDir, `${pipeline.name}.yml`);

  await fs.writeFile(outPath, yaml);
};

const main = async () => {
  await writePipeline(createMainPipeline());
};

main().catch(console.error);
