import {Page} from "@playwright/test";

type LibraryCollection = {
  [id: string]: Library;
}

type Library = {
  id: string;
  name: string;
  actions: {
    loginAction: Action;
    fetchRentBooks?: Action;
    reserveBook?: Action;
  }
}

type Action = {
  needs: Action[];
  run: (LibraryContext) => LibraryContext
}

type LibraryContext = {
  page: Page;
  library: Library;
  credentials: Credentials;
  libraryState: LibraryState
}

type Credentials = {
  [libraryID: Library['id']]: {
    id: string;
    password: string;
  }
}

type LibraryState = {
  [key: string]: unknown;
}
