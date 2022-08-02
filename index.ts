import { ensureConfig, notifyDiscord } from './helpers'

const run = async () => {
  await notifyDiscord('hello world')
}

const main = async () => {
  if (!await ensureConfig()) process.exit(1)
  await run()
}

main()
