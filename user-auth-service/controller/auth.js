const bcrypt = require('bcrypt');
const User = require('../models/User');
const loginSchema = require('../Utils/validations/login');
const registrationSchema = require('../Utils/validations/registration');
const util = require('../Utils/utility')


exports.registerUser = async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send('User already registered.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

    await user.save();
    res.send('Registration successful.');

};


exports.loginUser = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
  
    // const token = util.getToken(user);
    const token = user.getToken()
    res.header('Authorization', token).send('Login successful.');

  };