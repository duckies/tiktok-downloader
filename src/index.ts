import { spawn } from 'node:child_process'
import EventEmitter from 'node:events'
import { getOptions } from './options.js'

/**
 * Runs `yt-dlp` with the provided arguments.
 */
export function execute(url: string) {
  const emitter = new EventEmitter()
  const options = getOptions()
  const args: string[] = [
    `-o ${options.template}`,
    `-P ${options.paths.storage}`,
    url,
  ]

  const process = spawn(options.paths.executable, args)

  process.stdout.on('data', (data: Buffer) => emitter.emit('data', data.toString()))
  process.on('close', (code: number) => {
    emitter.emit('close', code)
  })

  return emitter
}

const url = process.argv[2]

if (!url) {
  console.error('Please provide a video URL.')
  process.exit(1)
}
else {
  execute(url)
}
