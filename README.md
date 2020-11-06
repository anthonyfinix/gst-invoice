# MongoDB Express React Node

### Server

`npm run server`

- [x] Server Port 3500
- [x] DB Mongo Atlas Connected with Mongoose
- [x] Basic Routing
- [x] JWT Authentication (x-token header, refreshToken-httponly)
  - [x] access token (x-token header) 1 minute
  - [x] refresh token (refresh-token cookie -httpOnly) 6 Days

| EndPoints      | Result              | Type | Description                                      |
| -------------- | ------------------- | ---- | ------------------------------------------------ |
| /              | Welcome Page        | GET  | Welcome HTML Page                                |
| /api/[product] | API Product Results | GET  | Product Details                                  |
| /login         | Login               | GET  | Get Current User Details if Logged in            |
| /login         | Login               | POST | Get Token and User information and refresh token |
| /register      | Register User       | POST | Registers Users                                  |
| /invoices      | get All Invoices    | GET  | Get All Invoices                                 |
| /invoices      | Add New Invoices    | POST | Add Invoices                                     |

### Client

`npm run client`

- [x] Client Port 3000
- [x] Material UI
- [x] React Router Dom
- [x] App Context
- [x] Login Page
- [x] Register Page
- [x] show user login and registration errors on snackbars
- [x] User Context
- [x] localStorage handles
- [x] Authentication
- [x] Product Context
- [x] Product Page
- [x] Sidebar
- [x] Partial Search Products
- [ ] Edit Products
- [ ] Delete Products
- [ ] Edit Invoice Items
- [ ] Delete Invoice Items
- [ ] Validate Products
