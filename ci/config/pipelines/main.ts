import {
  Pipeline,
  Presets,
  Job,
  Task,
  BuildMetadata,
  Command,
} from "@decentm/concourse-ts";
import { Secrets } from "../../secrets";

type Group = "my-group";

export default () => {
  return new Pipeline<Group>("test", (pipeline) => {
    const git = new Presets.Resource.GitRepo("my_repo", {
      uri: "https://github.com/DecentM/concourse-ts-field-test.git",
    });

    const discord = new Presets.Resource.SlackNotification("discord-ping", {
      url: Secrets.discord_webhook,
    });

    const testJob = new Job("test-job", (testJob) => {
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

          ociTask.run = new Command("build-command", (command) => {
            command.path = "build";
          });
        }).as_task_step((taskStep) => {
          taskStep.privileged = true;
        })
      );

      discord.as_failure_handler(testJob, {
        text: `Job "${BuildMetadata.BuildJobName}" failed in pipeline "${BuildMetadata.BuildPipelineName}" - ${BuildMetadata.AtcExternalUrl}/build/${BuildMetadata.BuildId}`,
      });

      discord.as_success_handler(testJob, {
        text: `Job "${BuildMetadata.BuildJobName}" succeeded in pipeline "${BuildMetadata.BuildPipelineName}"!`,
      });
    });

    pipeline.add_job(testJob, "my-group");
  });
};
