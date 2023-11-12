import { test, expect } from '@playwright/test'

test.describe('PageNotFoundPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/foo')
  })

  test('should have the appropriate document title', async ({ page }) => {
    await expect(page).toHaveTitle('Vue3 workshop @ 2023')
  })

  test('should display the subtitle', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('404')
  })
})
