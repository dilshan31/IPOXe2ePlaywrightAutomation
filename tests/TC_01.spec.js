const { test, expect } = require('@playwright/test');

import { HomePage } from '../pages/homepage'

const myuserdata = require('../data/TC_001.json')

test('Verify Search Results Locatie Groningen', async ({ page }) => {
  
  const Home = new  HomePage(page)

    await page.goto("https://portaal.iprox-open.nl/")

    await Home.verifySearchResult(myuserdata.searchText)

  

  });