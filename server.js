import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import List from './src/models/listModel.js';

const PORT = process.env.PORT || 5000;

const defaultList = async () => {
  const existingList = await List.findOne({ title: "My Tasks" });
  if (!existingList) {
    await List.create({ title: "My Tasks" });
    console.log('Default "My Tasks" list created.');
  }
};

connectDB().then(async () => {
  await defaultList();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});