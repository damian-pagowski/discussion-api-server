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
      { name: 'Programming', path: 'programming' },
      { name: 'Web Development', path: 'webdev' },
      { name: 'Testing', path: 'testing' },
    ]);
    console.log('Categories created:', categories.map(cat => cat.name).join(', '));

    // Seed Posts
    console.log('Seeding posts...');
    const posts = await Post.insertMany([
      {
        title: 'Learning JavaScript in 2024',
        body: 'JavaScript is still one of the most popular programming languages in 2024.',
        author: 'John Doe',
        categoryId: categories.find(cat => cat.name === 'Programming')._id,
        votes: 10,
      },
      {
        title: 'Web Development Trends 2024',
        body: 'Discover the latest web development trends and best practices for 2024.',
        author: 'Jane Smith',
        categoryId: categories.find(cat => cat.name === 'Web Development')._id,
        votes: 20,
      },
      {
        title: 'Why Testing Matters',
        body: 'Learn why testing is crucial for software development and quality assurance.',
        author: 'Alex Johnson',
        categoryId: categories.find(cat => cat.name === 'Testing')._id,
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