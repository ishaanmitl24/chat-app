const express = require("express");

const router = express.Router();

const {
  getSearchPeople,
  addFriend,
  getPendingRequests,
  respondToRequest,
  getFriends,
} = require("../controllers/friends");

router.get("/getSearchPeople", getSearchPeople);

router.post("/addFriend", addFriend);

router.post("/pending-requests", getPendingRequests);

router.post("/request-respond", respondToRequest);

router.post("/get-friends", getFriends);

module.exports = router;
