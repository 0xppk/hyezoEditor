import { expect, test } from '@playwright/test';

test('archive page has expected post data', async ({ page }) => {
	await page.goto('/archive');
	await expect(page.getByRole('textbox')).toBeVisible();
});
