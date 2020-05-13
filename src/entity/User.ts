import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length, IsNotEmpty, IsEmail } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 100)
  provider: string;

  @Column()
  @Length(1, 100)
  providerId: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(4, 100)
  displayName: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @Length(2, 100)
  firstName: string;

  @Column()
  @Length(2, 100)
  lastName: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword = async () => {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    console.log("checking sync");
    console.log(unencryptedPassword.toString());
    console.log("Done check sync");
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}