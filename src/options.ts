import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const config = {
  GITHUB: 'https://api.github.com/repos/yt-dlp/yt-dlp/releases?per_page=1',
  /**
   * The directory where the downloaded media will be stored relative
   * to the `config.ts` file.
   */
  DOWNLOADS_FOLDER: process.env.DOWNLOAD_PATH || '../dist/downloads',
}

export function getOptions() {
  return {
    paths: {
      executable: resolve(join(__dirname, '../dist/yt-dlp')),
      storage: resolve(join(__dirname, '../dist/downloads')),
    },
    template: '%(extractor)s-%(id)s.%(ext)s',
  }
}

export default config
