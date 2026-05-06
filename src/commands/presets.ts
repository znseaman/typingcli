import {Args, Command} from '@oclif/core'
import Conf from 'conf'

import {config} from '../config.js'
import {getPresets} from '../monkeytype.js'

export default class Presets extends Command {
  static override args = {
    file: Args.string({description: 'file to read'}),
  }
  static override description = 'describe the command here'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {}

  public printPresets(config: Conf) {
    const presets = config.get('presets') as Preset[]
    let string = `Preset Names:\n`
    for (const preset of presets) {
      string += `* ${preset.name}\n`
    }

    this.log(``)
    this.log(string)
    this.log(``)
    console.table(presets)
  }

  public async run(): Promise<void> {
    await this.parse(Presets)

    // list presets (name & conditions)
    let results
    try {
      results = await getPresets(config)
    } catch (error) {
      this.error(error as string, {exit: 1})
    }

    config.set('presets', results?.data)

    this.printPresets(config)
  }
}

export interface PresetsResponse {
  data: Preset[]
  message: string
}

export interface Preset {
  _id: string
  config: Config
  name: string
  settingGroups: unknown
}

export interface Config {
  accountChart: string[]
  alwaysShowWordsHistory?: boolean
  blindMode?: boolean
  burstHeatmap: boolean
  confidenceMode?: string
  customBackgroundFilter: number[]
  customLayoutfluid: string[]
  customPolyglot: string[]
  customThemeColors: string[]
  difficulty?: string
  favThemes: unknown[]
  fontSize: number
  funbox: unknown[]
  language?: string
  liveAccStyle?: string
  liveBurstStyle?: string
  minAccCustom: number
  mode?: string
  numbers?: boolean
  oppositeShiftMode?: string
  playSoundOnError: string
  punctuation?: boolean
  quickEnd?: boolean
  quickRestart: string
  quoteLength: number[]
  singleListCommandLine: string
  strictSpace?: boolean
  tags: string[]
  theme: string
  time?: number
  timerStyle?: string
  words: number
}
