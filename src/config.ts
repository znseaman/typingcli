import Conf from 'conf'

import {LoginResponse} from './commands/login.js'

export interface Config {
  displayName?: string
  email?: string
  expiresIn?: string
  idToken?: string
  localId?: string
  profilePicture?: string
  projectName: string
  refreshToken?: string
}

export const config = new Conf({projectName: 'typingcli'}) satisfies Conf

export function setConfig(obj: LoginResponse, config: Conf) {
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'expiresIn') {
      config.set(key, Date.now() + Number(Number(value) * 1000))
    } else {
      config.set(key, value)
    }
  }
}

export function isTokenValid(config: Conf) {
  const expiresIn = Number(config.get('expiresIn') || 0)
  if (!expiresIn) return false

  return Date.now() < expiresIn
}

export function expireToken(config: Conf) {
  config.delete('expiresIn')
}
