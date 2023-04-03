import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const employeeSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, Math: /[^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$]/ },
  phone: { type: Number },
  description: { type: String },
  date: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: Date.now },
});

export const employeeModel =
  models?.Employee || model("Employee", employeeSchema);
