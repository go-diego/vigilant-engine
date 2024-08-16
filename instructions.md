**Prompt**:
We would like you to make a functioning React Web Application using the publicly available
RxNorm API (https://rxnav.nlm.nih.gov/RxNormAPIs.html).

This is a simple web app with just 2 routes:

1. /drugs/search
2. /drugs/<drug_name>

We have provided wireframes that are purposefully vague so that you can add your own flair (in
the allotted time, of course). Feel free to use any libraries or frameworks you need for this
project. Use your time wisely, we recommend starting by mocking the APIs so you can build a
completed site quickly. Then go back and prioritize the key functionality as you plug in the real
APIs. Please send us your project files and all screenshots of your final product (a link to a
repo or a google drive / dropbox link works).

Requirements:

- Search bar should search by drug name using the getDrugs API (/drugs). Results should
  display the name field in the response and display after the user taps on the magnifying
  glass button or presses “enter” on their keyboard.
- If the user inputs invalid or incomplete drug name (such as “aspir”), the UI should display
  recommendations to the user by hitting the getSpellingSuggestions API
  (/spellingSuggestions) and displaying the results of that instead.
- If the spelling suggestions also does not display any results (such as “dfjhdfkj”), then
  display an error state that tells the user that nothing could be found for that term.
- Tapping on a search result should take the user to the second page
  (/drugs/<drug_name>).
- The second page (/drugs/<drug_name>) should display the rxcui field, the name field,
  and the synonym field from the API, and should populate the section for all NDCs
  associated to that particular drug name using the getNDCs api (/rxcui/<rxcui>/ndcs)

**Bonus Points (only do this if you have completed all above requirements in the 3 hr time frame)**

- Making the web app responsive to 3 viewports
- Loading animations during API calls
- Additional UI elements in the /drugs/<drug_name> page (your choice) that are
  interesting and are attainable via provided the RxNorm API.
