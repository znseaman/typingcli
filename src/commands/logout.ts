import {Command} from '@oclif/core'

import {config, expireToken} from '../config.js'

export default class Logout extends Command {
  static override args = {}
  static override description = 'describe the command here'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {}

  public async run(): Promise<void> {
    await this.parse(Logout)

    expireToken(config)

    this.log(`You've been logged out! See ya soon!`)
  }
}
