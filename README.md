
# Discussion API Server

This is a **RESTful API** server built using **Node.js**, **Express**, and **MongoDB**. 
It serves as the backend for a discussion platform where users can create posts, comments, and categories.

> **Work in Progress**: The project is not fully complete, and several key features are still in development.

---

## 📚 **Features**
- **CRUD for Posts**: Create, read, update, and delete posts.
- **CRUD for Comments**: Create, read, update, and delete comments on posts.
- **Categories Management**: Manage categories for posts.
- **Voting**: Upvote/downvote posts and comments.
- **Swagger API Docs**: Available at `/api-docs`.
- **Data Validation**: Input validation for secure API requests.
- **Seeding**: Seed the database with default posts, comments, and categories.

---

## 🚀 **What’s Still to be Done**
- **User Authentication**: Add user registration, login, and JWT token-based authentication.
- **Access Control**: Restrict endpoints so only authenticated users can create, edit, or delete data.
- **Testing**: Add automated tests for all endpoints and functionality.
- **Error Handling**: Improve error handling and add more user-friendly error messages.
- **Performance**: Add indexes for faster queries on large datasets.
- **Security**: Rate limiting, input validation, and protection against injection attacks.

---

## 📘 **How to Run This Project**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/discussion-api-server.git
   cd discussion-api-server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root of the project with the following variables:

   ```env
   SERVER_PORT=3000   # The port where the server will run
   DB_URI=mongodb://localhost:27017/discussion-api # MongoDB connection string
   JWT_SECRET=your_super_secret_key
   ```

   > **Note:** The `SERVER_PORT` must be defined. There is no default port intentionally.

4. **Run the seed script** to populate the database with some example posts, comments, and categories:

   ```bash
   node seeds/seed.js
   ```

5. **Start the server**:

   ```bash
   npm start
   ```

6. **Access the Swagger API Docs**:

   Open a browser and visit: [http://localhost:PORT/api-docs](http://localhost:PORT/api-docs)

   Replace `PORT` with the port you set in your `.env` file.

---

## 🛠️ **Tech Stack**
- **Node.js**: Runtime environment for executing JavaScript code on the server.
- **Express**: Web framework for creating APIs.
- **MongoDB**: NoSQL database for data storage.
- **Swagger**: API documentation and testing tool.
- **Mongoose**: MongoDB object modeling tool for Node.js.

---

## 🔥 **Run Tests**
To run the test suite, use:

```bash
npm test
```

> **Note:** Ensure MongoDB is running locally or adjust `DB_URI` in `.env` accordingly.

---

## 🖥️ **Folder Structure**
```
📁 discussion-api-server
├── 📁 controllers    # Business logic for routes
├── 📁 models         # Mongoose models for MongoDB collections
├── 📁 routes         # Route definitions for API endpoints
├── 📁 seeds          # Seed files for populating database with sample data
├── 📁 tests          # Unit and integration tests
├── 📄 app.js         # Main server file
├── 📄 .env           # Environment variables
├── 📄 swagger.yaml   # API documentation
└── 📄 package.json   # Dependencies and scripts
```

---

## 💬 **Feedback & Contributions**
Feel free to submit issues, suggestions, or contribute to this project. It's still a work in progress, and all contributions are welcome!

