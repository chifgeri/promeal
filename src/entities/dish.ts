import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Meal} from './meals';
import {Day} from './day';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Meal, meal => meal.dishes)
  meal: Meal;

  @Column()
  time: string;

  @ManyToOne(type => Day, day => day.mealsEaten)
  day: Day;
}
