import mongoose, { Schema, model } from 'mongoose';

const coordinatorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const careerSchema = new Schema(
  {
    career_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    career_name: {
      type: String,
      required: true,
      trim: true,
    },
    career_description: {
      type: String,
      required: true,
      trim: true,
    },
    modality: {
      type: String,
      required: true,
      enum: ['Presencial', 'En linea', 'Hibrido', 'Dual'],
    },
    quarter_duration: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    coordinator: coordinatorSchema,
    creation_date: {
      type: Date,
      default: () => new Date(),
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Career', careerSchema);
