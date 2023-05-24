import { Page } from '@playwright/test'

type LibraryCollection = {
  [id: string]: Library
}

type Library = {
  id: string
  name: string
  urls: {
    loginPageURL: string
    rentBooksPageURL?: string
    reservedBooksPageURL?: string
  }
  actions: {
    loginAction: Action
    fetchRentBooks?: Action
    reserveBook?: Action
  }
}

type Action = {
  needs: Action[]
  run: (context: LibraryContext) => Promise<LibraryContext>
}

type LibraryContext = {
  page: Page
  library: Library
  credentials: Credentials
  libraryState: LibraryState
}

type CredentialsStore = {
  [libraryID: Library['id']]: Credentials
}

type Credentials = {
  id: string
  password: string
}

type LibraryState = {
  [key: string]: unknown
}
