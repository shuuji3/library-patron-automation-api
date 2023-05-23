# library-patron-automation-api
📚 Automate patron actions on library websites (experimental)

## Notes

- Library collection: Library[]
  - Library: {
    - Actions: {
      - loginAction: Action
      - fetchRentBooks: Action
      - reserveBook: Action (& { ISBN } ?)
      - where
        - Action: { needs: Action[], run: (LibraryContext) => LibraryContext }
        - LibraryContext: { Page, Library, Credentials, LibraryState }

- `./cli <library> <action>`

```
library = find library from LibraryCollection
action = get action from library
context = make library context

def run_action(context, action):
  for need in action.needs:
    context = run_action(context, need)
  return action.run(context)  

context = run_action(context, action)
process context
```

```ts
function loginAction({ page, credentials: { userID, password } }) {
  const loginURL = 'https://opac.lib.city.bunkyo.tokyo.jp/opw/OPW/OPWUSERCONF.CSP'
  await page.goto(loginURL)
  await page.getByPlaceholder('利用券番号').click()
  await page.getByPlaceholder('利用券番号').fill(userID)
  await page.getByPlaceholder('パスワード').click()
  await page.getByPlaceholder('パスワード').fill(password)
  await page.getByRole('button', { name: '送信' }).click()
}
```
