const Cookbook = require("../Models/cookBook");

const CreateCookbook = async (req, res) => {
  const id = req.user._id;

  const duplicate = await Cookbook.findOne({ user: id }).lean();
  if (duplicate) {
    return res.status(409).json({ message: "Cookbook already exists" });
  }

  try {
    const book = await Cookbook.create({ user: id });
    return res.status(201).json(book);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

const addRecipe = async (req, res) => {
  const id = req.user._id;
  const recipe = req.body;

  if (!recipe || !recipe._id) {
    return res.status(400).json({ message: "Invalid recipe input" });
  }

  let cookbook = await Cookbook.findOne({ user: id }).exec();

  if (!cookbook) {
    cookbook = await Cookbook.create({ user: id });
  }

  try {
    const updated = await Cookbook.findByIdAndUpdate(
      cookbook._id,
      { $addToSet: { recipeList: recipe._id } },
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Failed to add recipe", error: err.message });
  }
}

const DeleteAll = async (req, res) => {
  const id = req.user._id;
  const cookbook = await Cookbook.findOne({ user: id }).exec();

  if (!cookbook) {
    return res.status(404).json({ message: "Cookbook not found" });
  }

  await cookbook.deleteOne();
  return res.status(200).json({ message: `Cookbook for user ${id} deleted` });
}

const DeleteOne = async (req, res) => {
  const id = req.user._id;
  const recipeID = req.params.id;

  const cookbook = await Cookbook.findOne({ user: id }).exec();
  if (!cookbook) {
    return res.status(404).json({ message: "You don't have a cookbook" });
  }

  try {
    const updated = await Cookbook.findByIdAndUpdate(
      cookbook._id,
      { $pull: { recipeList: recipeID } },
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Failed to remove recipe", error: err.message });
  }
}

const GetCookbook = async (req, res) => {
  const id = req.user._id;

  const cookbook = await Cookbook.findOne({ user: id })
    .populate("recipeList")
    .lean();

  if (!cookbook) {
    return res.status(404).json({ message: "You don't have a cookbook" });
  }

  return res.status(200).json(cookbook);
}

module.exports = {
  CreateCookbook,
  addRecipe,
  DeleteAll,
  DeleteOne,
  GetCookbook,
}
