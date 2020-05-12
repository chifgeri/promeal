import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Nutrient} from './nutrient';
import {Meal} from './meals';
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodApiID: string;

  @Column()
  name: string;

  @OneToMany(type => Nutrient, nutrient => nutrient.ingredient, {
    cascade: true,
  })
  nutrients: Nutrient[];

  @ManyToOne(type => Meal, meal => meal.ingredients, {onDelete: 'CASCADE'})
  meal: Meal;

  @Column()
  quantityInGramm: number;
}
