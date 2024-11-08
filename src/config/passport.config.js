import passport from "passport";
import jwt from "passport-jwt";
import localStrategy from "passport-local";
import { JWT_SECRET } from "../utils/jwt.js";
import { userModel } from "../models/user.model.js";
import { verifyPassword } from "../utils/hash.js";

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function initializePassport() {
    passport.use("login", new localStrategy({
        usernameField: "email",
    }, 
    async (email, password, done) => {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return done (null, false, { message: "User not found."});
            }

            const isPasswordCorrect = await verifyPassword(password, user.password);
            if (!isPasswordCorrect) {
                return done (null, false, { message: "Incorrect password."});
            }

            return done(null, user);
        } catch (error) {
            console.log(error);
            return done(`An error occured: ${error.message}`)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            return done(null, user);
    
        } catch (error){
            return done (`An error occured: ${error.message}`)
        }
    });
    
    passport.use(
        "jwt",
        new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: JWT_SECRET,
        }, async (payload, done) => {
            try {
                done(null, payload);
            } catch (error) {
                return done(error);
            }
        })
    )
};

function cookieExtractor(req) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies.token;
    }
    console.log("cookieExtractor", token);
    return token;
}

export { initializePassport };

