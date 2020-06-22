# Blustr
# Client

## Description
Blustr is a social media platform for sharing stories. It is self managed by its users and designed to be as lightweight as possible.

## User Stories
404 - Unregistered users can see a unique page when they go to a non-existant address.
View Stories - Unregistered users can freely view stories/posts.
Search Stories - Unregistered users can search stories based on popularity, date, or hashtags.
Manage Stories - Registered Users can like, dilike, favourite and hashtag others stories.
Add Stories - Registered Users can add stories to the database, anonomously or as an author.
Signin/Sign up/Signout - Users can sign in and sign out, non-users can sign up

## Backlog
### User Profile
- Create a page for the user's profile
- include version of the view page for the users favourites, likes and own stories
- Show graphs based on likes/dislikes/favourites that the user has recieved

### Stories
- Add ability to favourite stories
- Work on algorithms to consume unpopular stories

### Responsiveness
- Ensure that the full-screen and tablet versions of the site are well designed and attractive

## Client

### Routes
- / Landing page, though at the start it will redirect to home
- /Home Home page, where all stories can be viewed
- /Home/view/:id Home page, viewing one particular story
- /Auth Sign in and sign up page
- /Home/create Create page, where a user may create a new story

### Pages
- Home Page(public)
- View Page (public) (though edit buttons will redirect to signup)
- Auth Page (public)
- Create Page (private)

### Components
- Navbar
- Scrollable Panel
- Addable Image
- Error Popup
- PostCard
- Post
- Addable Text
- Auth Form
- Infinite Card Panel

### Services
- Auth
  - auth.login(user)
  - auth.logout()
  - auth.signup(user)
- Story
  - story.create(story)
  - story.delete(id)
  - story.like(id)
  - story.dislike(id

# Server
https://github.com/polymurph13/Blustr-Server

## Models

### User Model
- username - String // required & unique
- email - String // required & unique
- passhash - String // required
- dateJoined - Date // required
- posts - [ObjectId]
- alteredPosts - [{id: ObjectId, liked: false, disliked: false}]

### Post Model
- Author - ObjectId // required
- Content - [String] // required
- dateCreated - Date // required
- likes - Number // required
- dislikes - Number // required
- views - Number // required

## API Endpoint/Backend Routes
- GET /auth/curr-user
- POST /auth/signup
  - body:
    - username
    - email
    - passHash
- POST /auth/signin
  - body:
    - username
    - passHash
- POST /auth/logout
  - body: (empty)
- POST /story/create
  - body:
    - content
    - date
    - author
- POST /story/like
  - body:
    - storyId
- POST /story/dislike
  - body:
    - storyId
- POST /story/view
  - body:
    - storyId
- GET /story

## Links

## Git Tasks/Project
https://github.com/polymurph13/Blustr-Client/projects/1

## Git
### Client
https://github.com/polymurph13/Blustr-Client
### Server
https://github.com/polymurph13/Blustr-Server

### Deploy
to be added

### Slides
to be added

