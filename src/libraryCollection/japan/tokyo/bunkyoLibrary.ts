import { Library } from '../../../types'

export const bunkyoLibrary: Library = {
  id: 'japan-tokyo-bunkyo',
  name: '文京区図書館',
  urls: {
    loginPageURL:
      'https://opac.lib.city.bunkyo.tokyo.jp/opw/OPW/OPWUSERCONF.CSP',
    rentBooksPageURL:
      'https://opac.lib.city.bunkyo.tokyo.jp/opw/OPW/OPWUSERINFO.CSP',
    reservedBooksPageURL:
      'https://opac.lib.city.bunkyo.tokyo.jp/opw/OPW/OPWUSERINFO.CSP?DB=LIB&MODE=1&active=rsv#ContentRsv',
  },
  actions: {
    loginAction: {
      needs: [],
      run: async (context) => {
        const {
          page,
          library: {
            urls: { loginPageURL },
          },
          credentials: { id, password },
        } = context

        await page.goto(loginPageURL)

        await page.getByPlaceholder('利用券番号').click()
        await page.getByPlaceholder('利用券番号').fill(id)

        await page.getByPlaceholder('パスワード').click()
        await page.getByPlaceholder('パスワード').fill(password)

        await page.getByRole('button', { name: '送信' }).click()

        return context
      },
    },
  },
}
