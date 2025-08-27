import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  res.send("getAllUsers");
};

export const createUser = async (req, res) => {
  res.send("createUser");
};

export const createMultipleUsers = async (req, res) => {
  res.send("createMultipleUsers");
};

export const getUserById = async (req, res) => {
  res.send("getUserById");
};

export const updateUser = async (req, res) => {
  res.send("updateUser");
};

export const deleteUser = async (req, res) => {
  res.send("deleteUser");
};
