# Product API

SBA: Zenith e-commerce RESTful API with CRUD + advanced querying.

## Description
A modular RESTful API built with Node.js, Express, and Mongoose. Manages a product catalog with full CRUD operations and an advanced query endpoint supporting filtering, sorting, and pagination.

## Tech
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv

## Setup
1. Clone the repo
2. `npm install`
3. Create `.env` at project root (see `.env.example`)
4. `node server.js`



### Standard CRUD

| Method | Route | Description | Status Codes |
|---|---|---|---|
| POST | `/api/products` | Create a product | 201, 400 |
| GET | `/api/products/:id` | Get one product by ID | 200, 404 |
| PUT | `/api/products/:id` | Update a product | 200, 404 |
| DELETE | `/api/products/:id` | Delete a product | 200, 404 |

**Query parameter details:**
- `category` — exact match string
- `minPrice` — number, filters `price >= minPrice`
- `maxPrice` — number, filters `price <= maxPrice`
- `sortBy` — `price_asc` or `price_desc`
- `page` — page number, defaults to 1
- `limit` — items per page, defaults to 10

**Examples:**
```
GET /api/products?category=Electronics
GET /api/products?minPrice=50&maxPrice=200
GET /api/products?sortBy=price_desc&page=2&limit=5
GET /api/products?category=Books&minPrice=10&sortBy=price_asc
```

## Security
`.env` is git-ignored. See `.env.example` for required variables.

## Author
Kwadwo Danso

## Acknowledgements
- Per Scholas Mongo Module
- AI for debugging and troubleshooting

## Reflection

- Challenge:
Mostly with errors when running node server.js. ' errorLabelSet: Set(2) { 'HandshakeError', 'ResetPool' },
  errorResponse: {
    ok: 0,
    errmsg: 'bad auth : authentication failed',
    code: 8000,
    codeName: 'AtlasError'
  },
  ok: 0,
  code: 8000,
  codeName: 'AtlasError',
  connectionGeneration: 0
}' 

Resolved by using the different string connection in the .env