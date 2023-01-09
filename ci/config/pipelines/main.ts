import { Pipeline, Presets, Job, Task } from "@decentm/concourse-ts";
import { Secrets } from "../../secrets";

export default () => {
  return new Pipeline("test", (pipeline) => {
    const git = new Presets.Resource.GitRepo("my_repo", {
      uri: "https://github.com/DecentM/concourse-ts-field-test.git",
    });

    const discord = new Presets.Resource.SlackNotification("discord-ping", {
      url: Secrets.discord_webhook,
    });

    pipeline.add_job(
      new Job("test-job", (testJob) => {
        testJob.add_step(git.as_get_step({}));

        testJob.add_step(
          new Task("oci-build", (ociTask) => {
            ociTask.platform = "linux";

            ociTask.set_image_resource({
              type: "registry-image",
              source: {
                repository: "concourse/oci-build-task",
              },
            });

            ociTask.add_input({
              name: "concourse-ts-field-test",
              path: ".",
            });

            ociTask.add_output({
              name: "image",
            });

            ociTask.run = {
              path: "build",
            };
          }).as_task_step((taskStep) => {
            taskStep.privileged = true;
          })
        );

        discord.install_as_handlers(testJob);
      })
    );
  });
};
