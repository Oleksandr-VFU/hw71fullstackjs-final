import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const CarSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Coupe', 'Electric', 'Hatchback', 'Pickup', 'Sedan', 'SUV', 'Van']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICar>('Car', CarSchema, 'electrocars');
