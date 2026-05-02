import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('logout', () => {
  it('runs logout cmd', async () => {
    const {stdout} = await runCommand('logout')
    expect(stdout).to.contain(`You've been logged out! See ya soon!`)
  })
})
