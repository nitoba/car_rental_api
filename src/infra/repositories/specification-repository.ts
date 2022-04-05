import {
  CreateSpecificationDTO,
  ISpecificationRepository,
} from '../../application/repositories/ispecifications-repository';
import { Specification } from '../../domain/entities/specification';
import { specifications } from '../../external/database/in-memory-db';

export class SpecificationRepository implements ISpecificationRepository {
  async findByName(name: string): Promise<Specification> {
    return specifications.find((specification) => specification.name === name);
  }

  async findById(id: string): Promise<Specification> {
    return specifications.find((specification) => specification.id === id);
  }

  async findAll(): Promise<Specification[]> {
    return specifications;
  }

  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    specifications.push(specification);
  }
}