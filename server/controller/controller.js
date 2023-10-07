const { Categories, Transaction } = require("../models/model");

async function createCategories(req, res) {
  const { type, color, userID } = req.body;

  try {
    const newCategory = await Categories.create({
      type,
      color,
      userID,
    });
    res.json(newCategory);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error while creating categories: ${error}` });
  }
}

async function updateCategory(req, res) {
  const { _id, type, color, userID } = req.body;

  try {
    console.log("id", req.body._id); // Log the id to verify its value
    const updatedCategory = await Categories.findByIdAndUpdate(
      { _id },
      { type, color, userID },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error while updating category: ${error}` });
  }
}

async function deleteCategory(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body not found" });
  }

  try {
    await Categories.deleteOne(req.body);
    res.json("Record Deleted...");
  } catch (error) {
    res.status(400).json({ message: "Error while deleting Category Record" });
  }
}

async function getCategories(req, res) {
  try {
    const data = await Categories.find({});

    const filter = data.map((v) => ({
      _id: v._id,
      type: v.type,
      color: v.color,
      userID: v.userID,
    }));

    return res.json(filter);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error while retrieving categories: ${error}` });
  }
}

async function createTransaction(req, res) {
  if (!req.body) {
    return res.status(400).json("Post HTTP Data not provided");
  }

  const { name, category, amount, isRefundable, date, userID } = req.body;

  const create = new Transaction({
    name,
    type: category,
    amount,
    date: date, // Convert the provided date string to a Date object
    isRefundable: isRefundable || false,
    userID,
  });

  try {
    const savedTransaction = await create.save();
    res.json(savedTransaction);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error while creating transaction: ${error}` });
  }
}

async function updateTransaction(req, res) {
  const { _id, amount, name, category, isRefundable } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      { _id },
      { amount, name, type: category, isRefundable },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function getTransaction(req, res) {
  let data = await Transaction.find({});
  return res.json(data);
}

async function deleteTransaction(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body not found" });
  }

  try {
    await Transaction.deleteOne(req.body);
    res.json("Record Deleted...");
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while deleting Transaction Record" });
  }
}

async function getLabels(req, res) {
  try {
    const labels = await Transaction.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "categories_info",
        },
      },
      {
        $unwind: "$categories_info",
      },
    ]);

    let data = labels.map((v) =>
      Object.assign(
        {},
        {
          _id: v._id,
          date: v.date,
          name: v.name,
          type: v.type,
          amount: v.amount,
          color: v.categories_info["color"],
          isRefundable: v.isRefundable,
          userID: v.userID,
        }
      )
    );
    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error while retrieving labels: ${error}` });
  }
}

module.exports = {
  createCategories,
  getCategories,
  createTransaction,
  getTransaction,
  deleteTransaction,
  getLabels,
  deleteCategory,
  updateTransaction,
  updateCategory,
};
