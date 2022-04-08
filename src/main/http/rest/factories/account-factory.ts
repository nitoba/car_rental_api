import { CreateUserUsecase } from '../../../../application/usecases/create-user-usecase';
import { LoginEmailPasswordUsecase } from '../../../../application/usecases/login-email-password-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { EncryptRepositoryBcrypt } from '../../../../infra/repositories/encrypt-repository-bcrypt';
import { JwtRepository } from '../../../../infra/repositories/jwt-repository';
import { UsersRepositoryPrisma } from '../../../../infra/repositories/users-repository-prisma';
import { AuthenticateUserController } from '../../../../presentation/controllers/authenticate-user-controller';
import { CreateUserController } from '../../../../presentation/controllers/create-user-controller';
import { EnsureAuthenticatedMiddleware } from '../middlewares/ensure-authenticated';

const usersRepository = new UsersRepositoryPrisma(prisma);
const encryptRepository = new EncryptRepositoryBcrypt();
const jwtRepository = new JwtRepository();

export const createCreateUserController = () => {
  const usecase = new CreateUserUsecase(usersRepository, encryptRepository);
  return new CreateUserController(usecase);
};

export const createAuthenticateUserController = () => {
  const usecase = new LoginEmailPasswordUsecase(
    usersRepository,
    encryptRepository,
    jwtRepository
  );

  return new AuthenticateUserController(usecase);
};

export const createEnsureAuthenticatedMiddleware = () => {
  return new EnsureAuthenticatedMiddleware(jwtRepository, usersRepository);
};