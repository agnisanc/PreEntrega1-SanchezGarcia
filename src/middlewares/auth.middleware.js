import passport from "passport";

export function authorization (roles) {
    return async (req, res, next) => {
        if (!req.user)
            return res.status(401).json({message: "Not authorized" });

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ message: "Yo"})
        }

        next();
    };
}

export function authenticate (strategy) {
    return async (req, res, next) => {
        passport.authenticate (
            strategy, { session: false },
            async (error, user, info) => {
                if (error) return next(error);

                if (!user)
                    return res.status(401).json({
                        message: info.messages ? info.message : info.toString().split(": ")[1],
                });

                req.user = user;
                next();
            }
        )(req, res, next);
    };
}