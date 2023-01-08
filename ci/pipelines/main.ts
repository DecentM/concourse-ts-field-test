import * as ConcourseTs from '@decentm/concourse-ts'

export default () => {
  return new ConcourseTs.Pipeline('my-pipeline', (pipeline) => {
    pipeline.set_background_image_url(
      'https://picsum.photos/seed/concourse-ts/1920/1080'
    )
  })
}
