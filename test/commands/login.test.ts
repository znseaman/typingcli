import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('login', () => {
  it('fails login cmd when missing email arg', async () => {
    const result = await runCommand('login')
    expect(result.error?.message).to.contain('Missing 1 required arg')
  })
})
