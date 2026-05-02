import {LoginResponse} from './commands/login.js'

// used for sign in with password
const MONKEYTYPE_SIGN_IN_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
const MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_SEARCH_PARAMS = new URLSearchParams({
  key: 'AIzaSyB5m_AnO575kvWriahcF1SFIWp8Fj3gQno',
})
export const MONKEYTYPE_SIGN_IN_URL = `${
  MONKEYTYPE_SIGN_IN_BASE_URL
}?${MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_SEARCH_PARAMS.toString()}`

// used for getting a new access token from refresh token
const MONKEYTYPE_SECURE_TOKEN_BASE_URL = 'https://securetoken.googleapis.com/v1/token'
export const MONKEYTYPE_REFRESH_TOKEN_URL = `${
  MONKEYTYPE_SECURE_TOKEN_BASE_URL
}?${MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_SEARCH_PARAMS.toString()}`

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

export async function login(email: string, password: string): Promise<LoginResponse> {
  const requestOptions = {
    body: getBody(email, password),
    headers,
    method: 'POST',
  }
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  return fetch(MONKEYTYPE_SIGN_IN_URL, requestOptions).then((response) => response.json())
}

// export class MonkeyType {
//   constructor({username, password, userId, apiKey, debugMode = false}) {
//     this.username = username
//     this.password = password
//     this.userId = userId
//     // downside of using API key, fewer calls possible with only 30 times a day for /results endpoint
//     // upside is getting other user's data without them needing to authenticate
//     this.apiKey = apiKey
//     this.MONKEYTYPE_API_BASE_URL = 'https://api.monkeytype.com'

//     // used for sign in with password
//     this.MONKEYTYPE_SIGN_IN_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
//     this.MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_SEARCH_PARAMS = new URLSearchParams({
//       key: 'AIzaSyB5m_AnO575kvWriahcF1SFIWp8Fj3gQno',
//     })
//     this.MONKEYTYPE_SIGN_IN_URL = `${
//       this.MONKEYTYPE_SIGN_IN_BASE_URL
//     }?${this.MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_SEARCH_PARAMS.toString()}`

//     // used for getting a new access token from refresh token
//     this.MONKEYTYPE_SECURE_TOKEN_BASE_URL = 'https://securetoken.googleapis.com/v1/token'
//     this.MONKEYTYPE_REFRESH_TOKEN_URL = `${
//       this.MONKEYTYPE_SECURE_TOKEN_BASE_URL
//     }?${this.MONKEYTYPE_GOOGLE_APIS_IDENTITY_TOOLKIT_SEARCH_PARAMS.toString()}`

//     this.debugMode = debugMode

//     // rate limit reset time
//     this['x-ratelimit-reset'] = 0

//     // attributes set typically after login() call
//     this.displayName = null
//     this.accessToken = null
//     this.refreshToken = null
//     this.accessTokenExpiresAt = null

//     // get auth token from sqlite
//     let token = getActiveTokenByUserId.get(this.userId, Date.now())
//     if (this.debugMode && token) log('* access token retrieved from sqlite *')
//     if (!token) return false

//     const {idToken, expires_at, details} = token
//     const {displayName, refreshToken} = JSON.parse(details)

//     this.displayName = displayName
//     this.accessToken = idToken
//     this.refreshToken = refreshToken
//     this.accessTokenExpiresAt = expires_at
//   }

//   isAccessTokenExpired() {
//     return this.accessTokenExpiresAt < Date.now()
//   }

//   isRateLimited() {
//     return this['x-ratelimit-reset'] > Date.now()
//   }

//   printRateLimitResetInMinutes() {
//     const now = Date.now()
//     const minutes = differenceInMinutes(new Date(this['x-ratelimit-reset']), new Date(now))
//     log(`Rate limit reset in ${minutes} minutes...`)
//     log(`x-ratelimit-reset: ${this['x-ratelimit-reset']}`)
//     log(`now: ${now}`)
//   }

//   cleanup_db() {
//     this.deleteFromYesterdayUTC()
//   }

//   /**
//    * Clear out the old results and tokens
//    */
//   deleteFromYesterdayUTC() {
//     const today = new Date()
//     const yesterday = new Date(sub(today, {days: 1}))
//     const yesterdayMilliseconds = yesterday.getTime()

//     let result = deleteResultsBeforeTimestamp.run(this.userId, yesterdayMilliseconds)
//     if (this.debugMode && result)
//       log(`* result of deleteResultsBeforeTimestamp at and before ${yesterdayMilliseconds}`, result, '*')

//     let result2 = deleteExpiredTokensBeforeTimestamp.run(this.userId, yesterdayMilliseconds)
//     if (this.debugMode && result2)
//       log(`* result of deleteExpiredTokensBeforeTimestamp at and before ${yesterdayMilliseconds}`, result2, '*')
//   }

//   greet() {
//     log(``)
//     log(`  Welcome back, ${this.displayName || 'Anonymous'}!`)
//     log(``)
//   }

//   /**
//    * Call this to get the auth_token, refresh_token
//    */
//   async login() {
//     if (!this.isAccessTokenExpired()) return false

//     const username = this.username
//     const password = this.password

//     const myHeaders = new Headers()
//     myHeaders.append('Referer', 'https://monkeytype.com')
//     myHeaders.append(
//       'User-Agent',
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
//     )
//     myHeaders.append('Content-Type', 'application/json')

//     const raw = JSON.stringify({
//       returnSecureToken: true,
//       email: username,
//       password,
//       clientType: 'CLIENT_TYPE_WEB',
//     })

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     }

//     let response
//     try {
//       response = await fetch(
//         this.MONKEYTYPE_SIGN_IN_URL,
//         // "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5m_AnO575kvWriahcF1SFIWp8Fj3gQno",
//         requestOptions,
//       ).then((response) => response.json())
//     } catch (error) {
//       console.error(error)
//       return false
//     }

//     const {
//       kind,
//       localId: userId, // user_id
//       email,
//       displayName,
//       idToken: accessToken, // access_token
//       registered,
//       profilePicture,
//       refreshToken, // refresh_token
//       expiresIn, // when access_token expires in seconds
//     } = response

//     // save token to sqlite
//     this.saveTypingToken(response)

//     // save token attributes to object
//     this.userId = userId
//     this.accessToken = accessToken
//     this.refreshToken = refreshToken
//     this.displayName = displayName
//     this.accessTokenExpiresAt = Date.now() + Number(Number(expiresIn) * 1000)

//     if (this.debugMode)
//       log(
//         '* new access token & refresh token from username & password that expires in:',
//         this.accessTokenExpiresAt,
//         '*',
//       )

//     return response
//   }

//   async token() {
//     const myHeaders = new Headers()
//     myHeaders.append('Referer', 'https://monkeytype.com')
//     myHeaders.append(
//       'User-Agent',
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
//     )
//     myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

//     const urlencoded = new URLSearchParams()
//     urlencoded.append('grant_type', 'refresh_token')
//     urlencoded.append('refresh_token', this.refreshToken)

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow',
//     }

//     let response
//     try {
//       response = await fetch(this.MONKEYTYPE_REFRESH_TOKEN_URL, requestOptions).then((response) => response.json())
//     } catch (error) {
//       console.error(error)
//       return false
//     }

//     const {
//       access_token: accessToken, // access_token
//       expires_in: expiresIn, // when access_token expires in seconds
//       token_type, // typically 'Bearer'
//       refresh_token: refreshToken, // refresh_token
//       id_token, // same as access_token
//       user_id: userId, // user_id
//       project_id,
//     } = response

//     // save token to sqlite
//     this.saveTypingToken(response)

//     // save token attributes to object
//     this.userId = userId
//     this.accessToken = accessToken
//     this.refreshToken = refreshToken
//     this.accessTokenExpiresAt = Date.now() + Number(Number(expiresIn) * 1000)

//     if (this.debugMode)
//       log('* new access token from an existing refresh token that expires in:', this.accessTokenExpiresAt, '*')

//     return response
//   }

//   saveTypingToken(response) {
//     const tokenId = nanoid(6)
//     const tokenOwner = response.localId
//     const now = Date.now()
//     const tokenCreatedAt = now
//     const tokenExpiresAt = now + Number(response.expiresIn) * 1000
//     const tokenDetails = JSON.stringify(response)
//     try {
//       createToken.get(tokenId, tokenOwner, tokenCreatedAt, tokenExpiresAt, tokenDetails)
//     } catch (error) {
//       log('')
//       console.error(error)
//       log('')
//     }
//   }

//   async callAPI(url, pathname, params, use_method = false, authentication = 'bearerAuth') {
//     const {method} = this.getEndpointFromPathname(pathname, use_method)

//     if (this.isRateLimited()) {
//       this.printRateLimitResetInMinutes()
//       return false
//     }

//     if (authentication === 'bearerAuth' && this.isAccessTokenExpired()) {
//       if (this.refreshToken) {
//         await this.token()
//       } else {
//         await this.login()
//       }
//     }

//     let request
//     try {
//       request = await fetch(
//         this.createURL(`${url}${pathname}`, params),
//         this.createRequestOptions(method, authentication),
//       )

//       const response = await request.json()
//       if (request.status !== 200) {
//         throw Error(`${request.status} ${response.message} (uid: ${response.data?.uid})`)
//       }

//       return response
//     } catch (error) {
//       if (request?.status === 429 && authentication === 'bearerAuth') {
//         console.error(error)
//         log('')

//         if (this.debugMode) log(`x-ratelimit-limit: ${request.headers.get('x-ratelimit-limit')}`)
//         if (this.debugMode) log(`x-ratelimit-remaining: ${request.headers.get('x-ratelimit-remaining')}`)
//         if (this.debugMode) {
//           this['x-ratelimit-reset'] = Number(rightPad(request.headers.get('x-ratelimit-reset'), 13, '0'))
//           log(`x-ratelimit-reset: ${this['x-ratelimit-reset']}`)
//         }
//       } else {
//         console.error(error)
//         log('')
//       }
//     }
//   }

//   /**
//    * Legacy function based on expirementation
//    *
//    * @param {String} pathname
//    * @param {Boolean} use_method
//    * @returns
//    */
//   getEndpointFromPathname(pathname, use_method = false) {
//     if (use_method !== false) {
//       return {method: use_method}
//     }
//     const SLASH = '/'
//     const paths = pathname.split(SLASH)

//     if (paths[0] === '') {
//       paths.shift(0)
//     }

//     const directory = {
//       current: endpoints,
//       past: [SLASH],
//     }

//     for (const path of paths) {
//       if (!directory.current[path]) {
//         throw Error(`There is no path named "${path}" after "${directory.past.join(SLASH)}"`)
//       }

//       directory.past.push(path)
//       directory.current = directory.current[path]
//     }

//     return directory.current
//   }

//   createURL(url, params) {
//     const queryParams = Object.entries(params).reduce((acc, curr) => {
//       return acc + '&' + curr.join('=')
//     }, '?')

//     return `${url}${queryParams}`
//   }

//   /**
//    * Default to using bearer authentication method
//    * @param {*} method
//    * @param {*} useApiKey
//    * @returns
//    */
//   createRequestOptions(method, authorization = 'bearerAuth') {
//     const headers = new Headers()
//     const authorizationValue = authorization === 'bearerAuth' ? `Bearer ${this.accessToken}` : `ApeKey ${this.apiKey}`

//     headers.append('Authorization', authorizationValue)

//     return {
//       method,
//       headers,
//     }
//   }

//   async keptStreakAlive() {
//     const {
//       data: {lastResultTimestamp, length, hourOffset, maxLength},
//     } = (await this.callAPI(this.MONKEYTYPE_API_BASE_URL, '/users/streak', {}, 'GET')) || {
//       data: {
//         lastResultTimestamp: '',
//         length: '',
//         hourOffset: '',
//         maxLength: '',
//       },
//     }
//     if (!lastResultTimestamp) {
//       return false
//     }
//     const streakClaimed = this.hasStreakBeenClaimed(lastResultTimestamp, hourOffset)
//     const timeUntilStreakLost = this.getTimeUntilNextUTCDay()

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: streakClaimed,
//       goalName: `Daily Streak`,
//       goalCompleteText: `Come back in ${timeUntilStreakLost} to extend ${length}-day streak 😃`,
//       goalIncompleteText: `${length}-day streak lost in ${timeUntilStreakLost} ⏳`,
//     }
//   }

//   hasStreakBeenClaimed(lastResultTimeStamp, hourOffset) {
//     const streak_timezone = hourOffset === null ? 'UTC' : hourOffset

//     const timestamp_last = new Date(lastResultTimeStamp)
//     const timestamp_now = new Date(Date.now())

//     let claimed = false

//     if (streak_timezone === 'UTC') {
//       let hasSameDate = timestamp_last.getUTCDate() === timestamp_now.getUTCDate()
//       claimed = hasSameDate
//     }

//     return claimed
//   }

//   getTimeUntilNextUTCDay() {
//     const timestamp_now = new Date()
//     const nextDayUTC = this.getNextDayUTC(timestamp_now)

//     const hours = differenceInHours(nextDayUTC, timestamp_now)
//     if (hours > 0) {
//       return `${hours} hours`
//     }

//     const minutes = differenceInMinutes(nextDayUTC, timestamp_now)
//     if (minutes < 60 && minutes > 1) {
//       return `${minutes} minutes`
//     }

//     const seconds = differenceInSeconds(nextDayUTC, timestamp_now)
//     return `${seconds} seconds`
//   }

//   getNextDayUTC(date) {
//     return new Date(add(date, {days: 1}).toISOString().split('T')[0])
//   }

//   async getTodaysResults(offset = 0, limit = 1000, debug = false) {
//     const startOfTodayUTC = Number(new Date(new Date().toISOString().split('T')[0]))

//     // test only getting these from the SQLite database first
//     const resultsFromSQLite = getResultsAfterTimestamp.all(startOfTodayUTC).map(({details}) => JSON.parse(details))

//     // get the last timestamp from the SQLite database
//     let lastResultTimeStamp = resultsFromSQLite[resultsFromSQLite.length - 1]?.timestamp || startOfTodayUTC
//     if (debug) log('lastResultTimeStamp:', lastResultTimeStamp)
//     if (debug) log('startOfTodayUTC:', startOfTodayUTC)

//     const params = {
//       onOrAfterTimestamp: lastResultTimeStamp + 1, // on or after
//       offset,
//       limit,
//     }

//     if (debug) log('onOrAfterTimestamp:', params.onOrAfterTimestamp)

//     const {data: results} = (await this.callAPI(this.MONKEYTYPE_API_BASE_URL, '/results', params, 'GET')) || {
//       data: [],
//     }

//     //save API results to sqlite
//     for (const result of results) {
//       this.saveTypingResult(result)
//     }

//     if (debug) log('result', results[0])
//     if (debug) log('number of results fetched from API:', results.length)
//     if (debug) log('last result timestamp from API:', results[results.length - 1]?.timestamp)
//     if (debug) log('number of results fetched from SQL:', resultsFromSQLite.length)
//     if (debug) log('last result timestamp from SQL:', resultsFromSQLite[resultsFromSQLite.length - 1]?.timestamp)
//     return [...results, ...resultsFromSQLite]
//   }

//   /**
//    * SQLite query
//    */
//   saveTypingResult(result) {
//     const resultId = result._id
//     const resultOwner = result.uid
//     const resultDetails = JSON.stringify(result)
//     try {
//       createResult.get(resultId, resultOwner, resultDetails)
//     } catch (error) {
//       log('')
//       console.error(error)
//       log('')
//     }
//   }

//   /**
//    * SQLite query
//    */
//   getTypingResults() {
//     return getResultsByUserId.all(this.userId)
//   }

//   metDailyTypingGoal(results) {
//     let totalIncompleteTestTimeInSeconds = 0
//     let totalTimeInSeconds = 0
//     for (const result of results) {
//       const {testDuration, incompleteTestSeconds} = result
//       // include time spent typing but from incomplete tests
//       totalIncompleteTestTimeInSeconds += incompleteTestSeconds ? incompleteTestSeconds : 0
//       totalTimeInSeconds += testDuration
//     }

//     let totalIncompleteTestTimeInMinutes = Math.round(totalIncompleteTestTimeInSeconds / 60)
//     let totalTimeInMinutes = Math.round(totalTimeInSeconds / 60)
//     const FIFTEEN_MINUTES = 15
//     const metGoal = totalTimeInMinutes + totalIncompleteTestTimeInMinutes >= FIFTEEN_MINUTES

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metGoal,
//       goalName: `Daily Time (${FIFTEEN_MINUTES} min)`,
//       goalCompleteText: `Excellent job on typing ${
//         totalTimeInMinutes + totalIncompleteTestTimeInMinutes
//       } minutes today 🎉 (${totalIncompleteTestTimeInMinutes} min on incomplete tests)`,
//       goalIncompleteText: `Only ${FIFTEEN_MINUTES - totalTimeInMinutes} minutes more ⏳`,
//     }
//   }

//   metConsistencyTypingGoal(results, mode = 'words') {
//     const CONSISTENCY_PERCENT = 75
//     // go fast and focus on gaining confidence in pressing the key
//     const MINIMUM_RAW_WPM = 75
//     const MINIMUM_NUMBER_CONSISTENT_TESTS = 5
//     let numberOfConsistentTests = 0
//     const consistentTests = []
//     let mostConsistentScore = 0
//     for (const result of results) {
//       if (
//         this.isConsistentToPercent(result, CONSISTENCY_PERCENT) &&
//         this.hasMinimumRawWPM(result, MINIMUM_RAW_WPM) &&
//         this.metPracticeGoalModeStandard(result, mode)
//       ) {
//         consistentTests.push(result)
//         numberOfConsistentTests += 1
//         mostConsistentScore = Math.max(mostConsistentScore, result.consistency)
//       }
//     }

//     const metConsistencyGoal = numberOfConsistentTests >= MINIMUM_NUMBER_CONSISTENT_TESTS

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metConsistencyGoal,
//       goalName: `Consistency (${MINIMUM_NUMBER_CONSISTENT_TESTS} @ ${CONSISTENCY_PERCENT}% with min ${MINIMUM_RAW_WPM} raw wpm)`,
//       goalCompleteText: `(${numberOfConsistentTests}/${results.length}) 🎉`,
//       goalIncompleteText: `Only ${MINIMUM_NUMBER_CONSISTENT_TESTS - numberOfConsistentTests} more ⏳`,
//     }
//   }

//   metAccuracyTypingGoal(results, mode = 'words') {
//     const HUNDRED_PERCENT = 100
//     const MINIMUM_NUMBER_ACCURATE_TESTS = 5
//     let numberOfAccurateTests = 0
//     for (const result of results) {
//       if (this.isAccurateToPercent(result, HUNDRED_PERCENT) && this.metPracticeGoalModeStandard(result, mode)) {
//         numberOfAccurateTests += 1
//       }
//     }

//     const metGoal = numberOfAccurateTests >= MINIMUM_NUMBER_ACCURATE_TESTS

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metGoal,
//       goalName: `Accuracy (${MINIMUM_NUMBER_ACCURATE_TESTS} tests @ ${HUNDRED_PERCENT}%)`,
//       goalCompleteText: `(${numberOfAccurateTests}/${results.length}) 🎉`,
//       goalIncompleteText: `Only ${MINIMUM_NUMBER_ACCURATE_TESTS - numberOfAccurateTests} more ⏳`,
//     }
//   }

//   /**
//    * TODO: find a metric that doesn't require an extra API call
//    *   - charStats: [correct, incorrect, extra, missed]
//    */
//   metAdaptabilityTypingGoal(results, mode = 'words') {
//     const EXPERT_DIFFICULTY = 'expert'
//     const MINIMUM_NUMBER_TESTS = 5
//     let numberOfAdaptabilityTests = 0
//     for (const result of results) {
//       const {difficulty} = result
//       let isAdaptable = difficulty === EXPERT_DIFFICULTY
//       if (isAdaptable && this.metPracticeGoalModeStandard(result, mode)) {
//         numberOfAdaptabilityTests += 1
//       }
//     }

//     const metGoal = numberOfAdaptabilityTests >= MINIMUM_NUMBER_TESTS

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metGoal,
//       goalName: `Adaptability (${MINIMUM_NUMBER_TESTS} tests @ 100%)`,
//       goalCompleteText: `(${numberOfAdaptabilityTests}/${results.length}) 🎉`,
//       goalIncompleteText: `Only ${MINIMUM_NUMBER_TESTS - numberOfAdaptabilityTests} more ⏳`,
//     }
//   }

//   metSpeedTypingGoal(results, mode = 'words') {
//     const MINIMUM_WPM = 90
//     const MINIMUM_NUMBER_TESTS = 5
//     let numberOfTests = 0
//     for (const result of results) {
//       if (this.hasMinimumWPM(result, MINIMUM_WPM) && this.metPracticeGoalModeStandard(result, mode)) {
//         numberOfTests += 1
//       }
//     }

//     const metGoal = numberOfTests >= MINIMUM_NUMBER_TESTS

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metGoal,
//       goalName: `Speed (${MINIMUM_NUMBER_TESTS} tests with min ${MINIMUM_WPM} wpm)`,
//       goalCompleteText: `(${numberOfTests}/${results.length}) 🎉`,
//       goalIncompleteText: `Only ${MINIMUM_NUMBER_TESTS - numberOfTests} more ⏳`,
//     }
//   }

//   metNormalTypingGoal(results, mode = 'words') {
//     const MINIMUM_ACCURACY = 95
//     const MINIMUM_NUMBER_TESTS = 5
//     let numberOfTests = 0
//     for (const result of results) {
//       if (
//         this.isAccurateToPercent(result, MINIMUM_ACCURACY) &&
//         this.isClean(result) &&
//         this.metPracticeGoalModeStandard(result, mode)
//       ) {
//         numberOfTests += 1
//       }
//     }

//     const metGoal = numberOfTests >= MINIMUM_NUMBER_TESTS

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metGoal,
//       goalName: `Normal (${MINIMUM_NUMBER_TESTS} clean tests with min ${MINIMUM_ACCURACY}% acc)`,
//       goalCompleteText: `(${numberOfTests}/${results.length}) 🎉`,
//       goalIncompleteText: `Only ${MINIMUM_NUMBER_TESTS - numberOfTests} more ⏳`,
//     }
//   }

//   metPowerTypingGoal(results, mode = 'words') {
//     // go fast and focus on gaining confidence in pressing the key
//     const MINIMUM_RAW_WPM = 80
//     const MINIMUM_CONSISTENCY = 70
//     const MINIMUM_KEY_CONSISTENCY = 40
//     const MINIMUM_NUMBER_TESTS = 5
//     let numberOfTests = 0
//     let numberOfEligibleResults = 0
//     for (const result of results) {
//       if (this.metPracticeGoalModeStandard(result, mode) && this.isBlindMode(result)) {
//         numberOfEligibleResults += 1

//         if (
//           this.hasMinimumRawWPM(result, MINIMUM_RAW_WPM) &&
//           this.isConsistentToPercent(result, MINIMUM_CONSISTENCY) &&
//           this.isKeyConsistentToPercent(result, MINIMUM_KEY_CONSISTENCY)
//         ) {
//           numberOfTests += 1
//         }
//       }
//     }

//     const metGoal = numberOfTests >= MINIMUM_NUMBER_TESTS

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metGoal,
//       goalName: `Power (${MINIMUM_NUMBER_TESTS} @ min ${MINIMUM_KEY_CONSISTENCY}% key consistency [${MINIMUM_CONSISTENCY}% overall])`,
//       goalCompleteText: `(${numberOfTests}/${numberOfEligibleResults}) 🎉`,
//       goalIncompleteText: `Only ${
//         MINIMUM_NUMBER_TESTS - numberOfTests
//       } more (${numberOfEligibleResults} tries today) ⏳`,
//     }
//   }

//   metTimedTypingGoal(results, mode = 'time') {
//     const MINIMUM_NUMBER_TESTS = 5
//     let numberOfTests = 0
//     let numberOfEligibleResults = 0
//     for (const result of results) {
//       if (this.metPracticeGoalModeStandard(result, mode) && this.isBlindMode(result)) {
//         numberOfEligibleResults += 1
//         numberOfTests += 1
//       }
//     }

//     const metGoal = numberOfTests >= MINIMUM_NUMBER_TESTS

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metGoal,
//       goalName: `Timed 15/30/60 (${MINIMUM_NUMBER_TESTS} tests)`,
//       goalCompleteText: `(${numberOfTests}/${numberOfEligibleResults}) 🎉`,
//       goalIncompleteText: `Only ${
//         MINIMUM_NUMBER_TESTS - numberOfTests
//       } more (${numberOfEligibleResults} tries today) ⏳`,
//     }
//   }

//   metCodingTypingGoal(results, language = 'code') {
//     const MINIMUM_NUMBER_TESTS = 5
//     let numberOfTests = 0
//     let numberOfEligibleResults = 0
//     for (const result of results) {
//       const match = result?.language?.match(language)
//       if (match) {
//         numberOfEligibleResults += 1
//         numberOfTests += 1
//       }
//     }

//     const metGoal = numberOfTests >= MINIMUM_NUMBER_TESTS

//     return {
//       goalEmoji: ` ⌨️ `,
//       isComplete: metGoal,
//       goalName: `Code (${MINIMUM_NUMBER_TESTS} tests)`,
//       goalCompleteText: `(${numberOfTests}/${numberOfEligibleResults}) 🎉`,
//       goalIncompleteText: `Only ${
//         MINIMUM_NUMBER_TESTS - numberOfTests
//       } more (${numberOfEligibleResults} tries today) ⏳`,
//     }
//   }

//   isClean({charStats: [correct, incorrect, extra, missed]}) {
//     return incorrect === 0 && extra === 0 && missed === 0
//   }

//   isAccurateToPercent({acc}, minimum_accuracy = 95) {
//     return acc >= minimum_accuracy
//   }

//   hasMinimumRawWPM({rawWpm}, minimum_raw_wpm = 100) {
//     return rawWpm >= minimum_raw_wpm
//   }

//   hasMinimumWPM({wpm}, minimum_wpm = 100) {
//     return wpm >= minimum_wpm
//   }

//   isConsistentToPercent({consistency}, minimum_consistency = 80) {
//     return consistency >= minimum_consistency
//   }

//   isW25({mode, mode2}) {
//     return mode === 'words' && mode2 === '25'
//   }

//   hasNumbers({numbers}) {
//     return numbers === true
//   }

//   hasPunctuation({punctuation}) {
//     return punctuation === true
//   }

//   metPracticeGoalModeStandard(result, mode) {
//     switch (mode) {
//       case 'words':
//         return this.isW25(result) && this.hasNumbers(result) && this.hasPunctuation(result)
//       case 'time':
//         return result.mode === mode
//       default:
//         break
//     }
//   }

//   isPb({isPb}) {
//     return isPb === true
//   }

//   numberOfPbsToday(results) {
//     let numberOfTests = 0
//     for (const result of results) {
//       if (this.isPb(result)) {
//         numberOfTests += 1
//       }
//     }
//     return numberOfTests
//   }

//   fastestWPMToday(results) {
//     let max = -Infinity
//     for (const result of results) {
//       max = Math.max(max, result.wpm)
//     }
//     return max
//   }

//   isKeyConsistentToPercent({keyConsistency}, minimum_key_consistency = 60) {
//     return keyConsistency >= minimum_key_consistency
//   }

//   isBlindMode({blindMode}) {
//     return blindMode ? true : false
//   }
// }
