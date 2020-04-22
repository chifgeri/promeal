import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import {Nutrient} from './nutrient';
import {Meal} from './meals';
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Nutrient, nutrient => nutrient.ingredient, {cascade: true})
  nutrients?: Nutrient[];

  @ManyToOne(type => Meal, meal => meal.ingredients)
  meal: Meal;

  @Column()
  quantityInGramm: number;
}
