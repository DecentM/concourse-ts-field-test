import { Cli } from "@decentm/concourse-ts";

const main = async () => {
  const props = await Cli.parseProps(process.argv);
  await Cli.runApp(props);
};

main().catch(console.error);
