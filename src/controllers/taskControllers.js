import List from "../models/listModel.js";

export const addTask = async (req, res) => {
  try {
    const { title, isStarred } = req.body;
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: "List not found." });
    list.tasks.push({
      title,
      isCompleted: false,
      isStarred: isStarred || false,
    });
    const updatedList = await list.save();
    res.status(201).json(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { newTitle, isCompleted, isStarred } = req.body;
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: "List not found." });

    if (newTitle !== undefined && newTitle.trim() === "") {
      list.tasks.pull({ _id: req.params.taskId });
      list.updated_at = Date.now();
      const updatedList = await list.save();
      return res.status(200).json(updatedList);
    }

    const task = list.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found." });

    if (newTitle !== undefined && newTitle.trim() !== "") {
      task.title = newTitle;
    }

    if (isStarred !== undefined) {
      task.isStarred = !isStarred;
    }

    if (isStarred !== undefined && isCompleted !== undefined) {
      task.isCompleted = !isCompleted;
      task.isStarred = !isStarred;
    }

    list.updated_at = Date.now();
    task.updated_at = Date.now();

    const updatedList = await list.save();
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const moveTaskToList = async (req, res) => {
  try {
    const { movingListId } = req.body;
    const currentList = await List.findById(req.params.listId);
    if (!currentList) return res.status(404).json({ message: "Current list not found." });
    const movingList = await List.findById(movingListId);
    if (!movingList) return res.status(404).json({ message: "Moving list not found." });
    const task = currentList.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found." });
    movingList.tasks.push({ title: task.title , isCompleted: task.isCompleted , isStarred: task.isStarred});
    currentList.tasks.pull({ _id: task.id });
    movingList.updated_at = Date.now();
    currentList.updated_at = Date.now();
    const updatedCurrentList = await currentList.save();
    const updatedMovingList = await movingList.save();
    res.status(200).json(updatedMovingList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCompletedTasks = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: "List not found." });
    list.tasks = list.tasks.filter((task) => !task.isCompleted);
    list.updated_at = Date.now();
    const updatedList = await list.save();
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(404).json({ message: "List not found." });
    list.tasks.pull({ _id: req.params.taskId });
    list.updated_at = Date.now();
    const updatedList = await list.save();
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
