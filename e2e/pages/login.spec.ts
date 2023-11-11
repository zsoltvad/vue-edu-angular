import { test, expect } from '@playwright/test'

test.describe('LoginPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have the appropriate page title', async ({ page }) => {
    await expect(page).toHaveTitle('Login page')
  })

  test('should not display any error messages initially', async ({ page }) => {
    await expect(page.locator('[data-id="email-error-message"]')).toHaveCount(0)
    await expect(page.locator('[data-id="password-error-message"]')).toHaveCount(0)
  })

  test.describe('after the submit button is clicked', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('button').click()
    })

    test('should display the required e-mail error message', async ({ page }) => {
      await expect(page.locator('[data-id="email-error-message"]')).toHaveText(
        'Please enter your e-mail address'
      )
    })

    test('should display the required password error message', async ({ page }) => {
      await expect(page.locator('[data-id="password-error-message"]')).toHaveText(
        'Please enter your password'
      )
    })
  })

  test.describe('after an invalid e-mail address is entered', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('input[type="email"]').fill('foo')
      await page.locator('input[type="email"]').blur()
    })

    test('should display the invalid e-mail address error message', async ({ page }) => {
      await expect(page.locator('[data-id="email-error-message"]')).toHaveText(
        'Please enter a valid e-mail address'
      )
    })
  })

  test.describe('after a valid e-mail address and a passowrd is entered', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('input[type="email"]').fill('foo@bar.com')
      await page.locator('input[type="password"]').fill('apple1234')
      await page.locator('input[type="password"]').blur()
    })

    test('should not display any error messages', async ({ page }) => {
      await expect(page.locator('[data-id="email-error-message"]')).toHaveCount(0)
      await expect(page.locator('[data-id="password-error-message"]')).toHaveCount(0)
    })

    test.describe('after the submit button is clicked', () => {
      test.beforeEach(async ({ page }) => {
        await page.locator('button').click()
      })

      test('should navigate to the status page', async ({ page }) => {
        await expect(page).toHaveURL('/status')
      })
    })
  })
})
