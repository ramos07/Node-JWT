# Node.js with User Authentication (using JWT)

## Backend Tech Stack :wrench:

-   Express
-   bcryptjs
-   jsonwebtoken
-   mongoose
-   MongoDB

## Backend Project Structure :file_folder:

-   `config/`
    -   Configures the MySQL database and Sequelize
    -   Configures the Auth Key
-   `routes/`
    -   Contains the routes to be used in the API
    -   Auth route: POST for sign up and sign in
    -   User route: GET public and private resources
-   `middleware/`
    -   Contains necessary middleware to be used through out backend.
    -   Verify whether there are duplicate usernames or emails.
    -   Verity token that checks the users role in the database.
-   `controllers/`
    -   Contains necessary files to handle our applications backend actions.
    -   Handles sign up and sign in actions.
    -   Returns public and private resources.
-   `models/`
    -   Schema models for MySQL database using Sequelize.
-   `index.js`
    -   This will import and initialize the necessary modules and routes as well as listening for connections.

---

## API Routes :traffic_light:

### Authentication Routes

-   `api/auth/signup`
    -   Route used for user registration.
-   `api/auth/signin`
    -   Route used for user login.

### Authorizaton Routes

-   `api/test/all`
    -   Route that is used to access public content (not logged in).
-   `api/test/user`
    -   Route that is used to authorize access to protected resources for logged in users (user/moderator/admin).
-   `api/test/mod`
    -   Route that is used to authorize access to protected resources logged in as moderator.
-   `api/test/admin`
    -   Route that is used to authorize access to protected resources logged in as an admin.
