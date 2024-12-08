exports.HomePage = class HomePage
{
    constructor(page)
    {
      //Locators 
        this.page=page
        this.sf_search = page.locator("//input[contains(@class,'rounded-input font-text')]")
        this.btn_search = page.locator("//button[normalize-space(text())='Zoeken']")
        this.clickout = page.locator("//div[contains(@class,'bg-base-00 mt-navbar')]")
        this.results = page.locator("//div[@class='mt-12']")
    }

    async verifySearchResult(searchText){
      //Wait for the dom to be loaded properly 
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator("//a[normalize-space()='Wet Open Overheid']").scrollIntoViewIfNeeded();

        //Clicking on the header Wet Open Overheid
        const textExists = await this.page.locator("//a[normalize-space()='Wet Open Overheid']").isVisible();
        if (textExists) {
            console.log("The text 'Wet Open Overheid' exists on the page.");
            await this.page.locator("//a[normalize-space()='Wet Open Overheid']").hover()
          } else {
            console.log("The text 'Wet Open Overheid' is not found.");
          }
          await this.page.waitForLoadState('domcontentloaded');
        //Clicking on the sub menu option Woo-verzoeken
        const WetExists = await this.page.getByRole('menuitem', { name: 'Woo-verzoeken' }).isVisible();
        if (WetExists) {
            console.log("The text 'Woo-verzoeken' exists on the page.");
            await this.page.getByRole('menuitem', { name: 'Woo-verzoeken' }).click();
          } else {
            console.log("The text 'Woo-verzoeken' is not found.");
          }
        //Search for results using text Locatie Groningen
        await this.clickout.click()
        await this.sf_search.type(searchText)
        await this.btn_search.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForLoadState('networkidle')
        const locator = this.page.locator("(//div[@class='mt-12']//span)[1]")
        await locator.waitFor({ state: 'visible' });
        const text = await this.page.textContent("(//div[@class='mt-12']//span)[1]");
        const numberOfResults = parseInt(text.match(/(\d+)/)?.[1] || '0', 10);
        console.log(`Total search results: ${numberOfResults}`);

    // Verify that at least one search result is displayed with locatie Groningen text
    if (numberOfResults === 0) {
        throw new Error('No search results were found.');
      }
      console.log('At least one search result is displayed.');

      const elementText = await this.page.textContent("//div[@class='mt-12']");

      if (elementText.includes('locatie Groningen')) {
        console.log("The element contains the text 'locatie Groningen'.");
      } else {
        throw new Error("The element does not contain the text 'locatie Groningen'.");
      }
  

    }


}