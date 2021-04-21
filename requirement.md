# Requirements

Documentation for the development of the [**Large Blog API**](./README.md)

<br>

## User stories

**As a user, I want to:**

- Sign up, sign in, and have role based authorization

- Update user info (password, )
- See all articles, without login

- View all articles, save articles that I like (e.g. clap), as well as write, edit, delete own articles, when logged in

- Search by category filtered articles (e.g filtered by categories)

<!-- - move from article view to detail view, seeing the details about a specific **article** -->

- **Stretch goal:** Do a “keyword” search

- **Stretch goal:** Save my favorite **articles** so I can come back later

- **Stretch goal:** Share stories

- **Stretch goal:** Be to leave comments (chatting feature, will require login)

- **Stretch goal:** I want to be able to change my password and the rest of my user credentials

**As a contributor, I want to be able to:**

- Register a new account with the system, or Oauth, and login to my account

- See all my entries after logged in

- Create a blog entry under MY name

- Update ONLY MY entries

- Delete ONLY MY entries

- **Stretch goal:** Be notified when someone comments on my entry

- **Stretch goal:** See all comments that were made regardless of when they were posted.

- **Stretch goal:** Change my password

**As an administrator, I want to:**

- Delete anybody’s **article**.

- **Stretch goal:** Reset passwords for anybody.

<br>

## Technical requirements

### **Data Model** <br>

This will hold all our app’s database Schemas and Models.

- Articles
- Users

- The following fields/data types must be supported by your data model

1. Articles: _(How do we save the article in the db? Formatting it and the like is different from what I have done in the past)_

```

  - title: {type: string, required}

  - likes: {type: Number}

  - author: {type: string, required, role: [], user-identification}

  - article_text: {type: string, required}

  - content: {type: string, required}

    - **How am I going to do this?**

  - comments: {type: string, --- it will need to be attached to the user object of the commenter}

  - category: {type: A pre-listed array, required}

   import mongoose from 'mongoose';
   const { Schema } = mongoose;

   const blogSchema = new Schema({
      title:  String, // String is shorthand for {type: String},
      category: ???,
      author: String,
      body:   String,
      image_url: String,
      comments: [{ body: String, date: Date }],
      date: { type: Date, default: Date.now },
      hidden: Boolean,
      meta: {
         viewed: ???,
         likes: Number,
         favs:  Number
      }
  });
```

1. User _authenticated_

```
   username: {type: string, Required},
   password: {type: string, hashed. Required},
   role: {type: string, Required enum: [must separate regular user from Admin]}
```

```
1. UserAccount:

   - email
   - followers
   - following
   - written articles
   - saved articles
   - liked articles?
      - Should liked articles dictate what articles are suggested???

```

**Methods:**

- Hash the user password before save it

- Give different rights based on roles

- Make sure the user name is unique

- Compare hashed password in DB with user input

- Generate token

- authenticateWithToken

### **Controllers: Main server methods**

- View the articles (route handlers):

1. `getAll()`

   - Query DB
   - Uses model finder
   - Returns an array of objects(list of all articles)

1. `getOne()`

   - Query the database,
   - Find one item (article) using the model finder and the item ID(name?)
   - Return single object of the item

1. `getAuthorsArticles()` filtering the results based on user id
   -Within the route, use the bearer auth middleware to check for user and the user’s permissions

   - Query the database, find all the **articles** that related to this specific username
   - Return an array contains all the **articles**

1. `getByCategories()`

   - Query the database, find everything,
   - Returns list of all the records in the category.
   - API should return an object containing count and a results array.

1. `createArticle()`

   - Make sure that all of the middleware is being hit (bearerAuth, ACL)
   - Grab users input validate user model and then send
   - Send to data model … (need to research what goes on here)
   - On creating the **article** we will hit the a If users in logged in, Post item to the database, attach item to the users id, and then return the created **article** in formatted json

1. `updateArticle()`

   - Logged in users, can UPDATE their article, returns updated json to seller

1. `likeArticle()`

   - POST route

1. `commentArticle()`

- POST to the article obj

1. `deleteArticle()`
   - Logged in users can DELETE their article, return string saying (article name: deleted)
   - article.`findOneAndDelete()`

### **Auth server methods**

1. `handleSignup()` - Users create account with username, password (basic, bearer,

   - This will create an object with (username, password, and role)
   - Will need a users constructor saved to a variable (record)
   - Generate a token using the basicAuth middleware and attach it to the user object ( we will `use set()` )
   - Need to save the users record ---> `record.save()`

1. `handleLogin()` - Login with unique password

   - Need to read the Bearer token in the auth header and use the user model to validate the users token.
   - Uses the Bearer middleware

     - `users.find()`
     - If valid, return an object of the user information (maybe a /home route), possibly all of their products?(ex. “Welcome ...user… what would you like to do?
       - View your articles?
         - Saved articles
         - Explore other's articles
     - If not valid return an error

1. `handleUsers()` - What will admin's privileges be?

### Controller (routes)

```
Get ‘/articles’  --- returns all articles ( getAll handler)

Get ‘/articles/:id’ --- returns one article based on the ID ( getOne handler) ---
// ------ ??? How would this work??? ------ //

Get ‘/articles/:username --- returns all articles listed by one user ( bearer-auth middleware, getSellerList handler)

Get ‘/articles/:categories’ --- return all filtered articles by categories( getByCategories handler)

POST ‘/create’ --- logged in user can create one thing in database listed for sale ( bearer-auth middleware, ACL middleware,  createListing handler)

PUT ‘/articles/:id’ --- logged in user can modify the listing under their login (bearer-auth middleware, ACL middleware,updateArticle handler)

DELETE ‘/articles/:id’  --- logged in users can delete their articles(bearer-auth middleware, ACL middleware, deleteArticle handler).

POST ‘/signup’ --- where people sign up with the system ( signup handler)

POST ‘/login’ --- where people login to the system ( basic-auth middleware, login handler)
```

### Planned technologies

- [morgan](https://www.npmjs.com/package/morgan) - HTTP request **logger** middleware for node.js

- [winston](https://www.npmjs.com/package/winston) - A simple and universal logging library with support for multiple transports

- [Cloundinary](https://www.npmjs.com/package/cloudinary) - Package that manages uploading images

#### UML

### Architectural questions

- What is the best way to store a blog post?
- How do we grab one specific article? Will the user need to know the specific information about it (author, article name, date posted, id)? Do we want to have the search function search for key words? categories?
- How does the like/clap feature work?
  - It will be a `POST`
- How does sharing the article work? Just grab the articles url? `this.article.url`? --- seems to easy...

- **Auth** --- Storing the user's secure information in the same place as their articles, likes, comments, and the like? OR should I have a separate user model that has that sort of thing? Leaning towards one user model since all of the data will be attached to that user

**OR** Do I need to make an association to the user object when creating an article.

#### Links and references
