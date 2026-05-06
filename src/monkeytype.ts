import Conf from 'conf'

import {LoginResponse} from './commands/login.js'
import {PresetsResponse} from './commands/presets.js'

// used for sign in with password
const MONKEYTYPE_SIGN_IN_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'

const MONKEYTYPE_API_BASE_URL = 'https://api.monkeytype.com'

// eslint-disable-next-line n/no-unsupported-features/node-builtins
export const headers = new Headers()
headers.append('Referer', 'https://monkeytype.com')
headers.append(
  'User-Agent',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
)
headers.append('Content-Type', 'application/json')

function getBody(email: string, password: string) {
  return JSON.stringify({
    clientType: 'CLIENT_TYPE_WEB',
    email,
    password,
    returnSecureToken: true,
  })
}

export async function login(email: string, password: string, identityToolkitKey: string): Promise<LoginResponse> {
  const requestOptions = {
    body: getBody(email, password),
    headers,
    method: 'POST',
  }

  const MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_SEARCH_PARAMS = new URLSearchParams({
    key: identityToolkitKey,
  })

  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  return fetch(
    `${MONKEYTYPE_SIGN_IN_BASE_URL}?${MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_SEARCH_PARAMS.toString()}`,
    requestOptions,
  ).then((response) => response.json())
}

export function createRequestOptions(
  config: Conf,
  method: string,
  authorization = 'bearerAuth',
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
): {headers: Headers; method: string} {
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  const headers = new Headers()
  const authorizationValue =
    authorization === 'bearerAuth' ? `Bearer ${config.get('idToken')}` : `ApeKey ${config.get('apiKey')}`

  headers.append('Authorization', authorizationValue)

  return {
    headers,
    method,
  }
}

export async function getPresets(config: Conf): Promise<PresetsResponse> {
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  const results = await fetch(`${MONKEYTYPE_API_BASE_URL}/presets`, createRequestOptions(config, 'GET')).then(
    async (response) => {
      if (response.status >= 400) {
        throw new Error(
          `${response.statusText}. Try running the "login" command before running this again.`,
          await response.json(),
        )
      } else {
        return response.json()
      }
    },
  )
  return results
}
