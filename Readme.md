# A peroidic-table api for frontend apps

# Usage

## Example

```js
// GET /api/elements

const ajio = require("ajoijs")

// get all elements
ajio
  .get("/api/elements")
  .then((elements) => console.log(elements))
  .catch((err) => console.log(err))
```

### How to install Ajiojs (optional)

```bash
    npm install ajiojs
```

## You can create new Elements

```javascript
var ajio = require("ajio")

ajio
  .post("/api/elements/create", {
    body: JSON.stringfy(`{
    "atomicNumber": 1,
    "symbol": "H",
    "name": "Hydrogen",
    "atomicMass": "1.00794(4)",
    "cpkHexColor": "FFFFFF",
    "electronicConfiguration": "1s1",
    "electronegativity": 2.2,
    "atomicRadius": 37,
    "ionRadius": "",
    "vanDelWaalsRadius": 120,
    "ionizationEnergy": 1312,
    "electronAffinity": -73,
    "oxidationStates": "-1, 1",
    "standardState": "gas",
    "bondingType": "diatomic",
    "meltingPoint": 14,
    "boilingPoint": 20,
    "density": 0.0000899,
    "groupBlock": "nonmetal",
    "yearDiscovered": 1766
  }`),
  })
  .then((res) => {
    if (res.status == 200) console.log(data)
  })
  .catch((e) => {
    console.log(e)
  })
```

<!-- # Routes

```text
/api/elements


``` -->
