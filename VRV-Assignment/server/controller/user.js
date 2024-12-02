import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import UserModel from '../model/user.js'
const secret = 'secret';

export const signup = async (req, res) => {
  const { employee_id, password, name, phone, role } = req.body;
  try {
    const oldUser = await UserModel.findOne({ employee_id });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    await UserModel.create({ employee_id, password: hashedPassword, name, phone, role });

    const token = jwt.sign({ employee_id, role }, secret, { expiresIn: "1h" });

    return res.status(200).json({ role, employee_id, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }

};

export const signin = async (req, res) => {
  const { employee_id, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ employee_id });

    if (oldUser) {
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ employee_id: oldUser.employee_id, role: oldUser.role }, secret, { expiresIn: "1h" });

      return res.status(200).json({ role: oldUser.role, employee_id: oldUser.employee_id, token });
    }

    return res.status(400).json({ message: "Invalid credentials or User does not exist" });

  } catch (error) {
    console.log(error);
  }
}
