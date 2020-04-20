import {Ingredient} from './ingredient';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Ingredient, ingredient => ingredient.meal)
  ingredients: Ingredient[];

  @Column()
  name: string;
}
