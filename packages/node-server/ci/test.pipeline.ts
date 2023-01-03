import { Job, Pipeline, Resource, Step } from "@decentm/ci";

export default () => {
  return new Pipeline("test", (pipeline) => {
    const git = new Resource.GitRepo("node-server", {
      repository: "DecentM/concourse-ts-field-test",
      paths: ["packages/node-server"],
    });

    const oci = new Step.OciBuildTaskStep("build-image");

    const buildJob = new Job("build", (buildJob) => {
      buildJob.add_step(git.as_get_step({}));
      buildJob.add_step(oci);
    });

    pipeline.add_job(buildJob);
  });
};
