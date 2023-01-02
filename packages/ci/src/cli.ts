import * as ConcourseCli from "@decentm/concourse-ts/cli";

const main = async () => {
  const props = await ConcourseCli.parseProps(process.argv);
  await ConcourseCli.runApp(props);
};

main();
