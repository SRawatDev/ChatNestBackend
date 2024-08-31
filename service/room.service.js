import roommodel from "../model/room.model.js";

const roomservice = {};

roomservice.createroom = async (request) => {
  const existingRoom = await roommodel.findOne({ name: request.body.name });
  if (existingRoom) {
    return {
      message: `Room named "${request.body.name}" already exists.`,
      status: false,
    };
  }
  if (request.body.users.length < 2) {
    return {
      message: "A group must have at least 2 users.",
      status: false,
    };
  }
  await roommodel.create(request.body);
  return {
    message: "Room created successfully.",
    status: true,
  };
};

roomservice.getuserRoom = async (request) => {
  const data = await roommodel.aggregate([
    {
      $match: {
        users: {
          $in: [request.UserData._id],
        },
      },
    },
    {
      $project: {
        users: 0,
        messages: 0,
        createdAt: 0,
        __v: 0,
      },
    },
  ]);

  return { staus: true, data: data };
};

export default roomservice;
