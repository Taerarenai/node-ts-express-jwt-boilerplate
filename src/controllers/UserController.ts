import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import config from "../config/config";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import * as jwtDecode from 'jwt-decode';

class UserController {


    //Authentication

    static signJWT = async (user) => {
        const token = jwt.sign(
            { userId: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role, provider: user.provider, providerId: user.providerId },
            config.jwtSecret,
            { expiresIn: config.expiration, issuer: config.issuer, audience: config.audience }
        );

        return token;
    }

    static login = async (req: Request, res: Response) => {
        //Check if email and password are set
        let { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send();
        }

        //Get user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { email } });
        } catch (error) {
            res.status(401).send();
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }

        console.log("Logging in user");
        console.log(user);
        //Sing JWT, valid for 1 hour
        const token = await UserController.signJWT(user);

        //Send the jwt in the response
        res.send({ token: token });
    };

    static changePassword = async (req: Request, res: Response) => {
        //Get ID from JWT
        const token: any = jwtDecode(req.headers.authorization);

        const id: number = token.userId
        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        //Get user from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send("Invalid password or wrong email!");
            return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        //Hash the new password and save
        user.hashPassword();
        userRepository.save(user);

        res.status(204).send();
    };

    //Create & Update
    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { email, password, firstName, lastName } = req.body;
        let user = new User();

        user.provider = "CODETEK";
        user.providerId = "1";
        user.email = email;
        user.password = password;
        user.role = "USER";
        user.firstName = firstName;
        user.lastName = lastName;


        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            console.log(user);
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the email is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("email already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("User created");
    };


    static editOwnUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const token: any = jwtDecode(req.headers.authorization);

        const id: number = token.userId
        //Get values from the body
        const { provider, providerId, email, role, firstName, lastName } = req.body;

        //Try to find user on database
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        user.provider = provider;
        user.providerId = providerId;
        user.email = email;
        user.role = role;
        user.firstName = firstName;
        user.lastName = lastName;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means email already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("email already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const token: any = jwtDecode(req.headers.authorization);
        const id: number = token.userId


        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        userRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };


    //Get user by ID
    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = parseInt(req.params.id);

        //Get the user from database
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "email", "role", "firstName", "lastName", "provider"] //We dont want to send the passwords on response
            });

            res.status(200).send(user);
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static getOwnUser = async (req: Request, res: Response) => {
        const token: any = jwtDecode(req.headers.authorization);

        const id: number = token.userId

        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "email", "role", "firstName", "lastName", "provider"] //We dont want to send the passwords on response
            });
            res.status(200).send(user);
        } catch (error) {
            res.status(404).send("User not found");
        }
    }
};

export default UserController;