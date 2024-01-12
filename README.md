# Schedule by Saturday

- [ ] ## Frontend

  + Complete all pages inside Whatnow platform

- [ ] ## Backend

  ### Content Page

  + Content database (region included)
  + Information accepted from frontend
  + Once submitted, add to content also audit log

  + Add, search, delete, edit
  + With detailed documentation

  ### Audit log

  + Recording the changing history (database)
  + Add, search, delete, edit
  + With detailed documentation

  

  ## P.S.

  1. [API testing](https://www.postman.com/)

  

# API document

## Admin

### 1. GET: /admin/whatnow/contents

+ Return a list of object containing all object inside the content database.

+ **Params** : *key* and *value*

  + Select inside the content database for a specific key and its matching value
  + Note: Since mysql not supporting array type, all array are joined with special character '\~|\~'. If you want to search with array type as value, please connect all your elements with '\~|\~'. But select function contains array recovering stages.

+ Sample GET request:

  ```shell
  http://localhost:3000/admin/whatnow/contents?value=Winter%20Storm&key=Event%20Type
  ```

  Sample response:

  ```shell
  {
      "0": {
          "Event Type": "Winter Storm",
          "Other type - Yes/No": "No",
          "Region Name": "National",
          "Title": "Key Messages for Winter Storm",
          "Description": "These are actions to take to reduce risk and protect you and your household from winter storms.",
          "Web Url": null,
          "Mitigation Stages": [
              "Know your area's risks for extreme weather conditions",
              "Know your nearest points of medical support",
              "Prepare your home. Check on pipes and have safe heating sources.",
              "Prepare your vehicle with necessary emergency items and fuel"
          ],
          "Seasonal Forecast Stages": [
              "Prepare your home. Check on pipes and have safe heating sources.",
              "Prepare your vehicle with necessary emergency items and fuel",
              "Stay hydrated with warm fluids",
              "Check on neighbors, friends, and those at risk"
          ],
          "Watch Stages": [
              "Protect your home. Check on pipes and use heating sources safely.",
              "Stay hydrated with warm fluids",
              "Protect yourself with warm clothing and cover exposed skin",
              "Be aware and cautious of icy conditions, especially while driving",
              "Check on neighbors, friends, and those at risk"
          ],
          "Warning Stages": [
              "Protect your home. Check on pipes and use heating sources safely",
              "Stay hydrated with warm fluids",
              "Protect yourself with warm clothing and cover exposed skin",
              "Be aware and cautious of icy conditions, especially while driving",
              "Check on neighbors, friends, and those at risk"
          ],
          "Immediate Stages": [
              "Protect your home. Check on pipes and use heating sources safely",
              "Stay hydrated with warm fluids",
              "Stay inside.",
              "Be aware and cautious of icy conditions, especially while driving",
              "Know and watch for signs of hypothermia and frostbite",
              "Check on neighbors, friends, and those at risk"
          ],
          "Recover Stages": [
              "Be aware and cautious of icy conditions, especially while driving",
              "Be aware of power outages",
              "Be aware of flooding caused by snow melting"
          ]
      }
  }
  ```

### 2. POST: /admin/whatnow/contents/update

+ Insert or update existing record in database

  + Since object is large, request.body is used to load the object
  + The missing attributes will be filled by null after inserting or updating

+ Sample request (react form):

  ```json
  fetch('http://localhost:3000/admin/whatnow/contents/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "Event Type": "Test Winter Storm",
      "Other type - Yes/No": "No",
      "Region Name": "National",
      "Title": "Key Messages for Winter Storm",
      "Description": "These are actions to take to reduce risk and protect you and your household from winter storms."
    }),
  })
  ```

+ Sample respond:

  ```json
  {
      "success": true,
      "message": "Data successfully inserted or updated."
  }
  ```

  

  

