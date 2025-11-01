import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
  id: string;
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
      maxlength: [100, 'Name cannot exceed 100 characters']
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
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      match: [/^https?:\/\/.+\..+/, 'Please provide a valid URL']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Coupe', 'Electric', 'Hatchback', 'Pickup', 'Sedan', 'SUV', 'Van']
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

CarSchema.index({ name: 1, category: 1 });
CarSchema.index({ price: 1 });

export default mongoose.model<ICar>('Car', CarSchema, 'electrocars');
