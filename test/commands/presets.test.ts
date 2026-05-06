import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('presets', () => {
  it('runs presets cmd', async () => {
    const {stdout} = await runCommand('presets')
    expect(stdout).to.contain('Preset Names')
  })
})
