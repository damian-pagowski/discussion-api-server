// const express = require("express");
// const cors = require("cors");
// const postRoutes = require("./routes/postRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");

// const app = express();

// // ** CORS **
// app.use(cors({
//   origin: '*', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
//   allowedHeaders: ['*'], 
//   credentials: true 
// }));

// // ** Pre-flight requests for all routes **
// app.options('*', cors());

// app.use(express.json()); 

// // ** Route Handlers **
// app.use("/api/posts", postRoutes); 
// app.use("/api/comments", commentRoutes);
// app.use("/api/categories", categoryRoutes);

// // ** Global Error Handler **
// app.use((err, req, res, next) => {
//   console.error("Error: ", err.message); 
//   res.status(500).json({ error: err.message });
// });

// module.exports = app;

// // ------



const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['*'], 
  credentials: true 
}));

app.options('*', cors()); 

app.use(express.json()); 

// Swagger options and setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Discussion API',
      description: 'API for managing posts, comments, and categories',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.SERVER_PORT || 3000}/api`,
        description: 'Local server'
      }
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);

app.use((err, req, res, next) => {
  console.error("Error: ", err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;