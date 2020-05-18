import {Ingredient} from './ingredient';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import {Dish} from './dish';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  favorite?: boolean;

  @OneToMany(type => Ingredient, ingredient => ingredient.meal, {
    cascade: true,
  })
  ingredients: Ingredient[];

  @Column()
  name: string;

  @Column({default: false})
  deleted: boolean;

  @OneToMany(type => Dish, dish => dish.meal)
  dishes?: Dish[];
}
