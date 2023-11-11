import { test, expect } from '@playwright/test'

test.describe('StatusPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/status')
  })

  test('should redirect to the login page', async ({ page }) => {
    await expect(page).toHaveURL('/')
  })
})
