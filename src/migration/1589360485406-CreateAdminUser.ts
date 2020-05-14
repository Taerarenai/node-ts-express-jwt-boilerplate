/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User();
    user.provider = "CODETEK";
    user.providerId = "1";
    user.email = "admin@codetek.eu";
    user.displayName = "Admin";
    user.password = "admin";
    user.role = "ADMIN";
    user.firstName = "Admin";
    user.lastName = "Admin";
    user.hashPassword();
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
