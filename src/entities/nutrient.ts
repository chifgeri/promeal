import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Ingredient} from './ingredient';

@Entity()
export class Nutrient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nutrient: string;

  @Column()
  amount: string;

  @Column()
  unit: string;

  @ManyToOne(type => Ingredient, ingredient => ingredient.nutrients)
  ingredient: Ingredient;
}
