import { test } from '@playwright/test'

import { Action, LibraryContext } from './types'

import { libraryCollection } from './libraryCollection'
import { credentialsStore } from '../credentialsStore'

test('tokyo-bunkyo-library: login to the user page', async ({ page }) => {
  const libraryID = 'japan-tokyo-bunkyo'
  const library = libraryCollection[libraryID]
  const credentials = credentialsStore[libraryID]
  const context: LibraryContext = {
    page,
    library,
    credentials,
    libraryState: { isLogin: false },
  }

  console.log('libraryState:', context.libraryState)
  const {
    actions: { loginAction },
  } = library
  const loginContext = await runAction(context, loginAction)
  console.log('->', loginContext.libraryState)
})

async function runAction(context: LibraryContext, action: Action) {
  for (const need of action.needs) {
    context = await runAction(context, need)
  }
  return action.run(context)
}
