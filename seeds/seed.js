require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Category = require('../models/category');
const MONGO_URI = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process with failure
  }
};


const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log('Removing old data...');
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Category.deleteMany({});

    // Seed Categories
    console.log('Seeding categories...');
    const categories = await Category.insertMany([
      { name: 'Programming', path: 'programming' , categoryId: 1},
      { name: 'Web Development', path: 'webdev' , categoryId: 2},
      { name: 'Testing', path: 'testing' ,  categoryId: 3},
    ]);
    console.log('Categories created:', categories.map(cat => cat.name).join(', '));

    // Get the auto-incremented categoryIds
    const categoryIdMap = {};
    categories.forEach(category => {
      categoryIdMap[category.name] = category.categoryId;
    });

    // Seed Posts
    console.log('Seeding posts...');
    const posts = await Post.insertMany([
      {
        title: 'Learning JavaScript in 2024',
        body: 'JavaScript is still one of the most popular programming languages in 2024.',
        author: 'John Doe',
        categoryId: categoryIdMap['Programming'], // Reference by categoryId, not ObjectId
        votes: 10,
      },
      {
        title: 'Web Development Trends 2024',
        body: 'Discover the latest web development trends and best practices for 2024.',
        author: 'Jane Smith',
        categoryId: categoryIdMap['Web Development'], // Reference by categoryId
        votes: 20,
      },
      {
        title: 'Why Testing Matters',
        body: 'Learn why testing is crucial for software development and quality assurance.',
        author: 'Alex Johnson',
        categoryId: categoryIdMap['Testing'], // Reference by categoryId
        votes: 15,
      }
    ]);
    console.log('Posts created:', posts.map(post => post.title).join(', '));

    // Seed Comments for Each Post
    console.log('Seeding comments for posts...');
    const comments = await Promise.all(
      posts.map(async post => {
        const comment = new Comment({
          parentId: post._id,
          body: `This is a comment on the post titled "${post.title}"`,
          author: 'Random User',
          votes: 2
        });
        await comment.save();
        return comment;
      })
    );
    console.log('Comments created:', comments.map(comment => comment.body).join(', '));

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

// Run the seed process
(async () => {
  await connectDB();
  await seedDatabase();
})();