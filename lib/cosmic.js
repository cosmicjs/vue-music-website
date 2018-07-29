import Cosmic from 'cosmicjs'
const cosmic = Cosmic()

const config = {
  slug: 'music-page',
  read_key: 'jtSayuuME7eNWFnLd0QEtnyZ9FpyafBo6J6HdWbe7XJvTwV64L',
  write_key: 'FSRpuw47gHA183CnJ0LboGGHtA0tFOqGcLB8ECVEAK2krev9Ns'
}

export default function getBucket () {
  return cosmic.bucket(config)
}
