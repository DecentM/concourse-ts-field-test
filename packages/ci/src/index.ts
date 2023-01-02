import * as ConcourseTs from "@decentm/concourse-ts";

export class Pipeline extends ConcourseTs.Pipeline {
  constructor(name: string, init?: ConcourseTs.Initer<Pipeline>) {
    super(name, init);

    this.set_background_image_url("https://picsum.photos/1920/1080.jpg");
  }
}

export * as Resource from "./resources";

export class Job extends ConcourseTs.Job {
  constructor(name: string, init?: ConcourseTs.Initer<Job>) {
    super(name, init);

    this.build_log_retention = {
      builds: 5,
      minimum_succeeded_builds: 3,
    };
  }
}

export class Task extends ConcourseTs.Task {
  constructor(name: string, init?: ConcourseTs.Initer<Task>) {
    super(name, init);

    this.set_cpu_limit_percent(50);
    this.set_memory_limit_percent(50);
  }
}