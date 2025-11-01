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
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
      index: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      index: true
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      match: [/^https?:\/\/.+\..+/, 'Please provide a valid URL']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Coupe', 'Electric', 'Hatchback', 'Pickup', 'Sedan', 'SUV', 'Van'],
      index: true
    }
  },
  {
    timestamps: true
  }
);

CarSchema.index({ name: 1, category: 1 });
CarSchema.index({ price: 1 });

export default mongoose.model<ICar>('Car', CarSchema, 'electrocars');
