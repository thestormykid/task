var User = require('../../model/user');
const JWT 				= require("jsonwebtoken");
const { JWT_SECRET } 	= require("../../config");

signToken = user => {
    return JWT.sign(
        {
            iss: "Hanu",
            sub: user.id,
            iat: new Date().getTime(), //current Time
            exp: new Date().setDate(new Date().getDate() + 1) //current day +1
        },
        JWT_SECRET
    );
};


module.exports = {

    loginUser: function(req, res) {
        const token = signToken(req.user);
        console.log('aslkdjaslkdjalskdjalskdjalksjdlaskjd');

        res.json({ token: token, user: req.user });
    },

    addUser: function (req, res) {
        console.log(req.body);
        // console.log()?
        const { name, email, password } = req.body.user;

        User.findOne({ email }, function(err, foundUser) {
            if (err) {
                console.log(err);
                res.status(500).json('internal server error');
                return;
            }

            if (foundUser) {
                return res.status(200).json("exists");
            }

            var newUser = new User({name: name, email: email, password: password})

            newUser.save(function(err, userCreated) {
                if (err) {
                    console.log(err);
                    res.status(500).json('internal server error');
                    return;
                }

                var token = signToken(newUser);
                return res.json(token);
            })
        });
    }
}
