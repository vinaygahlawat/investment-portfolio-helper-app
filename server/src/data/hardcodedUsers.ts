import { Users } from "../server";

const hardcodedUsers: Users = {
  testuser1: {
    _id: "uuid_user1",
    password: "$2b$10$uadAhFu.wjng4w1Dm2ovIuX9H3dvZ7bSHmCZXjPlsCy2mZmvPPDBu", // bcrypt hash for "testpass1"
  },
};

export default hardcodedUsers;
