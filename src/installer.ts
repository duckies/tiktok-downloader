import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import got from 'got'
import config, { getOptions } from './options.js'

interface GitHubRelease {
  assets: Array<{
    name: string
    browser_download_url: string
  }>
}

export async function getRelease() {
  const options = getOptions()
  const releases = await got(config.GITHUB).json<GitHubRelease[]>()
  const latest = releases.at(0)

  if (!latest) {
    throw new Error('Could not find latest release on GitHub.')
  }

  const asset = latest.assets.find(({ name }) => name === 'yt-dlp')

  if (!asset) {
    throw new Error('Could not find download for `yt-dlp` executable.')
  }

  return pipeline(got.stream(asset.browser_download_url), createWriteStream(options.paths.executable))
}

