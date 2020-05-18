import {Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';
import {Dish} from './dish';

@Entity()
export class Day {
  @PrimaryColumn()
  date: string;

  @OneToMany(type => Dish, dish => dish.day, {cascade: true})
  mealsEaten: Dish[];

  @Column()
  weight: number;
}
