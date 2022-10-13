import mongoose, { Schema } from 'mongoose'

var userSchema = new Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
})

export default mongoose.model('User', userSchema)
