import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true }
});

const Group = mongoose.model('Group', groupSchema);
export default Group; 