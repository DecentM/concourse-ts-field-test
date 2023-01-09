import { get_secret } from "@decentm/concourse-ts/src/utils";

export const Secrets = {
  discord_webhook: get_secret("discord-webhook-url"),
};
