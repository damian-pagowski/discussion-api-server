# API Server
API server for simplified content rating and discussion application

# Installation 

To install and start the API server, run the following commands in this directory:

* `npm install`
* `node server`

## Using The Server

### Authorization 

Not implemented yet:( 
Probably JWT to authorize api calls. User Authentication with Passport JS

### Comment Counts
not implemented yet:(

### API Endpoint

The following endpoints are available:

| Endpoints       | Usage          | Params         |
|-----------------|----------------|----------------|
| `GET /categories` | Get all of the categories.|  |
| `POST /categories` | Create new category. |  **name** - user friendly name of category displayed in app<br> **path** - useed to identify category in API calls|
| `GET /:category/posts` | Get all of the posts for a particular category. |  |
| `GET /posts` | Get all of the posts. Useful for the main page when no category is selected. |  |
| `POST /posts` | Add a new post. | **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Category ID|
| `GET /posts/:id` | Get the details of a single post. | |
| `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. |
| `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] |
| `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
| `GET /posts/:id/comments` | Get all the comments for a single post. | |
| `POST /comments` | Add a comment to a post. | **body** - [String] <br> **author** - [String] <br> **parentId** - Should match a post id in the database. |
| `GET /comments/:id` | Get the details for a single comment. | |
| `POST /comments/:id` | Used for voting on a comment. | **option** - [String]: Either `"upVote"` or `"downVote"`.  |
| `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] |
| `DELETE /comments/:id` | Sets a comment's deleted flag to `true`. | &nbsp; |
