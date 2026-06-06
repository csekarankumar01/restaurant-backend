

###  Backend Repository README
Create a file named `README.md` in your `restaurant-backend` repository and paste this:

```markdown
# IndianRestro - Backend API

The production-ready RESTful API engine powering **IndianRestro**. Built on the Node.js/Express framework utilizing MongoDB, this backend implements a strict MVC design pattern to securely handle data orchestration, user sessions, system menus, and booking reservations.

## ✨ Key Features
* **RESTful API Gateway:** Clean, semantic endpoints separating concerns for menu, user profiles, and table data.
* **Secure Authentication:** Implemented state-of-the-art token-based user security using JSON Web Tokens (JWT) and encrypted password storage via `bcrypt`.
* **Database Modeling:** Robust schemas with strict Mongoose validation rules protecting data integrity.
* **Global Error Middleware:** Centralized error-interceptor pipeline to handle exception logging without crashing runtime processes.

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Security:** JWT, Bcrypt, CORS, Helmet

## ⚙️ Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) installed locally.
* A running [MongoDB Local Instance](https://www.mongodb.com/try/download/community) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI string.

### Local Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/csekarankumar01/restaurant-backend.git](https://github.com/csekarankumar01/restaurant-backend.git)
   cd restaurant-backend
