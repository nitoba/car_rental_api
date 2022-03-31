import { categories } from '../database/in-memory-db';
import { Category } from '../entities/category';

type CreateCategoryDTO = {
  name: string;
  description: string;
};

type UpdateCategoryDTO = {
  id: string;
  name: string;
  description: string;
};

export interface ICategoryRepository {
  create(category: CreateCategoryDTO): Promise<void>;
  update(category: UpdateCategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export class CategoryRepository implements ICategoryRepository {
  categories: Category[];
  constructor() {
    this.categories = categories;
  }

  async findAll(): Promise<Category[]> {
    return categories;
  }

  async findById(id: string): Promise<Category> {
    return categories.find((category) => category.id === id);
  }

  async findByName(name: string): Promise<Category> {
    return categories.find((category) => category.name === name);
  }

  async update({ id, name, description }: UpdateCategoryDTO): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );

    const category = this.categories[categoryIndex];

    categories[categoryIndex] = Object.assign(category, {
      id,
      name,
      description,
      updatedAt: new Date(),
    });
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    categories.push(category);
  }
}
