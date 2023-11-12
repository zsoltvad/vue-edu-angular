import { test, expect } from '@playwright/test'

test.describe('StatusPage', () => {
  test.describe('with an unauthenticated user', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/status')
    })

    test('should redirect to the login page', async ({ page }) => {
      await expect(page).toHaveURL('/')
    })
  })

  test.describe('with an authenticated user', () => {
    test.beforeEach(async ({ page }) => {
      await page.route(
        'https://dsp-health-upscale-api-upscale.azure-api.net/api/v0/system-status/health',
        async (route) => {
          const response = await route.fetch()
          await route.fulfill({
            response,
            json: {
              services: {
                foo: {
                  healthStatus: 'UP'
                },
                bar: {
                  healthStatus: 'DOWN'
                }
              }
            }
          })
        }
      )
    })

    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      await page.locator('input[type="email"]').fill('foo@bar.com')
      await page.locator('input[type="password"]').fill('apple1234')
      await page.locator('button').click()
      await expect(page).toHaveURL('/status')
    })

    test('should load the services', async ({ page }) => {
      await expect(page.locator('[data-id="service-name"]')).toHaveText(['foo', 'bar'])
      await expect(page.locator('[data-id="service-status"]')).toHaveText(['✅', '❌'])
    })
  })
})
