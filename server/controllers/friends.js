const {
  getSearchPeopleService,
  addFriendService,
  getPendingRequestsServices,
  respondToRequestService,
  getFriendsService,
} = require("../services/friendsService");

const getSearchPeople = async (req, res, next) => {
  const { search, page } = req.query;
  const newPage = parseInt(page);
  if (!search || !newPage) {
    res.status(422).json({ msg: "Invalid Query!", ok: false });
  }
  try {
    const { status, data } = await getSearchPeopleService(
      search,
      newPage,
      req.userId
    );
    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

const addFriend = async (req, res, next) => {
  const { sendersId, receiversId } = req.body;
  if (!sendersId && !receiversId) {
    res.status(422).json({ msg: "Invalid senderId and receiverId", ok: false });
  }
  try {
    const { status, data } = await addFriendService(sendersId, receiversId);
    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

const getPendingRequests = async (req, res, next) => {
  const { userId } = req.body;
  const { page } = req.query;
  if (!userId || userId !== req.userId) {
    res.status(422).json({ msg: "Invalid userId", ok: false });
  }
  try {
    const { status, data } = await getPendingRequestsServices(userId, page);
    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

const respondToRequest = async (req, res, next) => {
  const { status: newStatus, connectionId, userId } = req.body;
  if (!newStatus || !connectionId) {
    res.status(422).json({ msg: "Invalid status or connectionId", ok: false });
  }
  try {
    const { status, data } = await respondToRequestService(
      newStatus,
      connectionId,
      userId
    );
    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

const getFriends = async (req, res, next) => {
  const { userId } = req.body;
  const { page } = req.query;
  if (!userId || req.userId !== userId) {
    res.status(422).json({ msg: "Invalid userId", ok: false });
  }
  try {
    const { status, data } = await getFriendsService(userId, page);
    res.status(status).json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getSearchPeople,
  addFriend,
  getPendingRequests,
  respondToRequest,
  getFriends,
};
