# A chemistry api for frontend apps

# Usage

## Get

```js
// /api/periodic-table/elements
//Get provide a name
// /api/periodic-table/elements/name

const ajio = require("ajoijs")

ajio
  .get("/api/periodic-table/elements")
  .then((elements) => console.log(elements))
  .catch((err) => console.log(err))
```

### How to install Ajiojs

```bash
    npm install ajiojs
```

## Post

```json
 //with Data
{
"name": "Sr",
"Symbol": "Stronsium",
"ElementNumber": 38,
"ElementWeight": 88.9,
"Elevtronegativity": 1,
"IsRadioActive": "false",
"Phase": "Solid"
"Group": "1"
}
```

# Routes

```text
/api/periodic-table/elements/create

/api/periodic-table/elements/update/:symbol

/api/periodic-table/elements/delete/:symbol

/api/periodic-table/elements/delete/:symbol
```
