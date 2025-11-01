import { Request, Response } from 'express';
import Car from '../models/Car.model';

export const getAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 12, name = '', sortBy = '', order = 'asc' } = req.query;

    const query: any = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = order === 'desc' ? -1 : 1;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const cars = await Car.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const totalCount = await Car.countDocuments(query);

    const carsData = cars.map(car => car.toJSON());

    res.json({ data: carsData, totalCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

export const getCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create car' });
  }
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update car' });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
};
