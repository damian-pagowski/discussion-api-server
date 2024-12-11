const Category = require("../models/category");

// ** Get all categories **
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// ** Create a new category **
exports.createCategory = async (req, res, next) => {
  try {
    const category = new Category({ ...req.body });
    const savedCategory = await category.save();
    res.json(savedCategory);
  } catch (error) {
    next(error);
  }
};

// ** Get a single category by ID **
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// ** Update a category by ID **
exports.updateCategoryById = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// ** Delete a category by ID **
exports.deleteCategoryById = async (req, res, next) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};