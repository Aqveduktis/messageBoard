import mongoose from 'mongoose'

export const User = mongoose.model('User', {
  name: String
})

export const Message = mongoose.model('Message', {
  message: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})