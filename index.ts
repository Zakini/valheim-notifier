import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import notify from './commands/notify'
import { ensureConfig } from './helpers'

const run = async () => {
  yargs.scriptName('vnot')
    .command(notify)
    .parse(hideBin(process.argv))
}

const main = async () => {
  if (!await ensureConfig()) process.exit(1)
  await run()
}

main()
