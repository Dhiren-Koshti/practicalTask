let users = [];
let index = 0;

const userCreateRepo = (userData) => {
  const findDuplicateEmail = users.filter((user) => {
    return userData.email == user.email;
  });

  if (findDuplicateEmail.length) {
    return "Sorry, This Email is Already Exist!";
  }

  const user = { id: ++index, ...userData };
  users.push(user);
  return user;
};

const fetchAllRepo = () => {
  return users;
};

const fetchUserRepo = (id) => {
  const user = users.filter((user) => {
    return user.id == id;
  });

  return user;
};

const updateUserRepo = (id, newData) => {
  const user = users.filter((user) => {
    return user.id == id;
  });

  if (!user.length) {
    return { Message: "User is not found" };
  }

  if (newData.email) {
    const findDuplicateEmail = users.filter((user) => {
      return user.id != id && user.email == newData.email;
    });

    if (findDuplicateEmail.length) {
      return { Message: "Sorry, This Email is Already Exist!" };
    }
  }

  const updateUser = { ...user[0], ...newData };

  users.forEach((user) => {
    if (user.id == id) {
      Object.assign(user, updateUser);
    }
  });

  return { Message: "User is sucessfully updated", User: updateUser };
};

const deleteUserRepo = (id) => {
  const user = users.filter((user) => {
    return user.id == id;
  });

  if (!user.length) {
    return { Message: "User is not found" };
  }

  const updateUsers = users.filter((user) => {
    return user.id != id;
  });

  users = updateUsers;

  return { Message: "User is sucessfully deleted!" };
};

module.exports = {
  userCreateRepo,
  fetchAllRepo,
  fetchUserRepo,
  updateUserRepo,
  deleteUserRepo,
};
