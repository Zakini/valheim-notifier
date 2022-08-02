import { CommandModule } from 'yargs'
import { notifyDiscord } from '../helpers'

// TODO refine list into actually useful events
const events = [
  'server_starting',
  'server_started',
  'server_restarting',
  'server_restarted',
  'server_stopping',
  'server_stopped'
] as const

type Event = typeof events extends readonly (infer T)[] ? T : never

const notify = {
  command: ['notify <event>', '$0'],
  describe: 'Notify a Discord server of a given Valheim server event',
  builder: yargs => yargs.positional('event', {
    type: 'string',
    choices: events
  }),
  // TODO human readable message
  handler: ({ event }) => notifyDiscord(event)
} as CommandModule<{}, { event: Event }>

export default notify
