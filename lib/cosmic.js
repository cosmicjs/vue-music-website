import Cosmic from 'cosmicjs'
const cosmic = Cosmic()

const config = {
  slug: process.env.slug,
  read_key: process.env.read_key,
  write_key: process.env.write_key
}

export default function getBucket () {
  return cosmic.bucket(config)
}
