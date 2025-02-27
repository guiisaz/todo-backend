import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { JwtPayload } from "src/_interfaces/jwt-payload";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy){
        constructor(
            @InjectModel(User) private userModel: typeof User
        ){super({
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              secretOrKey: 'a-very-secure-secret',
            });;}

        async validate(payload: JwtPayload):Promise<any> {
            const user = await this.userModel.findOne({
                where: {
                  id: payload.id,
                  email: payload.email,
                },
              });

            return user
        }
    }