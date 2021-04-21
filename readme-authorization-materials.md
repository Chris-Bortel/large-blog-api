# Resources

- [Mongoose setters](https://mongoosejs.com/docs/api.html#schematype_SchemaType-set)

## Virtuals - one-to-many

- I want to have at least three models. User() , Article() , UserInfo()

- `getter` will be used to attach the token to the user.
  - How do I connect user to the the BlogPosts() , and the UserInfo() --> which includes
  - likes
  - followers
  - comments: attached to BlogPosts()
  - followed: attached to userInfo
  - saved: attached to userInfo
  -

[Virtuals](https://mongoosejs.com/docs/guide.html#virtuals) allow you to reference the 'document' after you create it? That is what I am wanting to do.

- I want to have the blog post created and saved in the database, and then when a user is logged in they can get their info.

  - I also want the user to be able to search be other authors by name.

- The user needs to be connected to their BlogPosts!

- What is `ref: 'user'` doing? --- I figure that it is referencing the user model.
  - That said, are we referencing the userInfo model via the UserAuth, or the other way around?
