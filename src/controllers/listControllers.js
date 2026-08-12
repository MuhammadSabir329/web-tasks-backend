import List from "../models/listModel.js";

export const getLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: 'List not found.' });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createList = async (req, res) => {
  try {
    const { title } = req.body;
    const newList = new List({ title, isChecked: true });
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateList = async (req, res) => {
  try {
    const { newTitle, isChecked } = req.body;
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: 'List not found.' });

    if (newTitle !== undefined) {
      list.title = newTitle;
    }

    if (isChecked !== undefined) {
      list.isChecked = !isChecked;
    }

    list.updated_at = Date.now();

    const updatedList = await list.save();
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteList = async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.listId);
    if (!deletedList) return res.status(404).json({ message: 'List not found.' });

    res.status(200).json({ message: "List deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
