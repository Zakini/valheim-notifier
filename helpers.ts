import axios from 'axios'
import Conf from 'conf'
import { PathLike, constants } from 'fs'
import fs from 'fs/promises'
import path from 'path'

export class NotifyError extends Error {}

export const config = new Conf({
  projectSuffix: ''
})

const canAccess: (path: PathLike, mode?: number | undefined) => Promise<boolean> = async (...args) => {
  try {
    await fs.access(...args)
    return true
  } catch {
    return false
  }
}

export const ensureConfig = async () => {
  if (!await canAccess(config.path, constants.F_OK)) {
    console.warn(`No config found. Creating example config at ${config.path}. Please add the relevant values to this file.`)

    try {
      await fs.copyFile(path.resolve(__dirname, 'config.json.example'), config.path)
    } catch (e) {
      console.error('Failed to create example config file', e)
    }

    return false
  }

  if (!await canAccess(config.path, constants.R_OK)) {
    console.error(`Cannot read config file at ${config.path}`)
    return false
  }

  return true
}

export const notifyDiscord = async (message: string) => {
  const url = config.get('discord.webhook')

  if (typeof url !== 'string') {
    throw new NotifyError(`Invalid config value for "discord.webhook". Expected string, got ${typeof url}`)
  }

  await axios.post(url, { content: message })
}
