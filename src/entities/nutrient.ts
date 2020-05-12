import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Ingredient} from './ingredient';

@Entity()
export class Nutrient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nutrientApiID: string;

  @Column()
  nutrient: string;

  @Column()
  amount: number;

  @Column()
  unit: string;

  @ManyToOne(type => Ingredient, ingredient => ingredient.nutrients, {
    onDelete: 'CASCADE',
  })
  ingredient: Ingredient;
}
