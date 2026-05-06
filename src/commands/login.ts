import {Args, Command, Flags} from '@oclif/core'
import Conf from 'conf'
import {read} from 'read'
import terminalImage from 'terminal-image'

import {config, isTokenValid, setConfig} from '../config.js'
import {login} from '../monkeytype.js'

export interface LoginResponse {
  displayName: string
  email: string
  expiresIn: string
  idToken: string
  kind: string
  localId: string
  profilePicture: string
  refreshToken: string
  registered: boolean
}

export default class Login extends Command {
  static override args = {
    email: Args.string({description: 'email address', required: true}),
  }
  static override description = 'log into MonkeyType by first providing email'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {
    identityToolkitKey: Flags.string({
      description: 'API key for Google API Identity Toolkit',
      env: 'MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_KEY',
    }),
  }

  public async displayProfilePicture(url?: string): Promise<void> {
    if (!url) return

    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    const body = await (await fetch(url)).arrayBuffer()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.log(await terminalImage.buffer(body, {height: '15%', width: '15%'}))
  }

  public async greet(displayName: string): Promise<void> {
    this.log(``)
    this.log(`Welcome back, ${displayName.split(' ')[0]}!`)
    this.log(``)
  }

  public async printSuccess(config: Conf) {
    this.greet(String(config.get('displayName')))
    await this.displayProfilePicture(String(config.get('profilePicture')))
    this.log(``)
    this.log(`(If this isn't you, run the logout command...)`)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Login)

    if (config.get('email') !== args.email) {
      config.set('email', args.email)
    }

    // Bypass if under expires in
    if (isTokenValid(config)) {
      await this.printSuccess(config)
      this.exit(0)
    }

    let response: LoginResponse
    try {
      const password = await read({prompt: 'Enter password', silent: true})
      if (!password) {
        this.error(`Invalid password, try again`)
      }

      response = await login(args.email, password, flags.identityToolkitKey as string)
    } catch (error) {
      this.error(`Encountered an error... ${error}`)
    }

    setConfig(response, config)

    await this.printSuccess(config)
  }
}
