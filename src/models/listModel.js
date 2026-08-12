import mongoose from "mongoose";
import taskSchema from "./taskModel.js";

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [taskSchema],
    isChecked: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("List", listSchema);