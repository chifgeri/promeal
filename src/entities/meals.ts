import {Ingredient} from './ingredient';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Ingredient, ingredient => ingredient.meal, {
    cascade: true,
  })
  ingredients: Ingredient[];

  @Column()
  name: string;
}
