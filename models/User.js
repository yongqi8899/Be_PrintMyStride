import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: [true, 'User name is required'], default: 'user' },
  email: { type: String, required: [true, 'Email image is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'], select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

export default model('User', userSchema);