import { test, expect } from '@playwright/test'

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have the appropriate document title', async ({ page }) => {
    await expect(page).toHaveTitle('Vue3 workshop @ 2023')
  })

  test('should display the page title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Vue3 workshop @ 2023')
  })
})
