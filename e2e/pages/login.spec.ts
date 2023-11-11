import { test, expect } from '@playwright/test'

test.describe('LoginPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the page title', async ({ page }) => {
    await expect(page.locator('p')).toHaveText('Login Page')
  })
})
