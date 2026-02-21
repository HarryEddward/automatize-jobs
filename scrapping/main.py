import asyncio
from camoufox import AsyncCamoufox


async def main():
    async with AsyncCamoufox(
        headless=False,
        humanize=10,
    ) as browser:
        page = await browser.new_page()
        await page.goto("https://google.com")
        
        await page.get_by_text("Accept all", exact=True).click()
        await page.get_by_role(role="combobox").fill("Camoufox")
        await page.get_by_text("Google Search").click()

        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main()) 