import { test, expect } from '@playwright/test'

test.describe('PageNotFoundPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/foo')
  })

  test('should display the page title', async ({ page }) => {
    await expect(page.locator('p')).toHaveText('Page Not Found')
  })
})
