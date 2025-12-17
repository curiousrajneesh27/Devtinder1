import { ConnectionRequestModel } from "../models/connectionRequest.model.js";
import { UserModel } from "../models/user.model.js";
import { AsyncHandler } from "../utils/handlers.js";

const USER_SAFE_DATA = "name gender age photoUrl about skills";

// Received connection requests
const receivedConnectionRequests = AsyncHandler(async (req, res, next) => {
    // Get logged in user's data
    const loggedInUser = req.user;

    // Get all the connection requests received
    const connectionRequestsReceived = await ConnectionRequestModel.find({
        receiverId: loggedInUser._id,
        status: "interested"
    })
        .select("senderId")
        .populate({ path: "senderId", select: USER_SAFE_DATA });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched connection requests received successfully",
        data: connectionRequestsReceived
    });
});

// All Connections
const allConnections = AsyncHandler(async (req, res, next) => {
    // Get logged in user's data
    const loggedInUser = req.user;

    // Get all the connections
    const allConnections = await ConnectionRequestModel.find({
        $or: [
            { senderId: loggedInUser._id, status: "accepted" },
            { receiverId: loggedInUser._id, status: "accepted" }
        ]
    }).populate([
        { path: "senderId", select: USER_SAFE_DATA },
        { path: "receiverId", select: USER_SAFE_DATA }
    ]);

    // Get all the connections data in structured way
    const allConnectionsData = allConnections.map((connection) => {
        if (String(connection.senderId._id) === String(loggedInUser._id)) {
            return connection.receiverId;
        } else {
            return connection.senderId;
        }
    });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all connections successfully",
        data: allConnectionsData
    });
});

// Feed
const userFeed = AsyncHandler(async (req, res, next) => {
    // Get logged in user's data
    const loggedInUser = req.user;

    // Get all the connections made by the user
    const allConnections = await ConnectionRequestModel.find({
        $or: [{ senderId: loggedInUser._id }, { receiverId: loggedInUser._id }]
    });

    // Filter out the users to hide from the feed
    const usersToHideFromFeed = new Set();
    allConnections.forEach((connection) => {
        usersToHideFromFeed.add(connection.senderId._id.toString());
        usersToHideFromFeed.add(connection.receiverId._id.toString());
    });

    // Add blocked users to hide from feed
    if (loggedInUser.blockedUsers) {
        loggedInUser.blockedUsers.forEach((blockedUserId) => {
            usersToHideFromFeed.add(blockedUserId.toString());
        });
    }

    // Get all the users except for the ones to hide from feed
    let usersToBeShownOnFeed = await UserModel.find({
        $and: [
            { _id: { $nin: Array.from(usersToHideFromFeed) } },
            { _id: { $ne: loggedInUser._id } },
            { blockedUsers: { $nin: [loggedInUser._id] } } // Exclude users who blocked current user
        ]
    }).select(USER_SAFE_DATA);

    // Smarter matching: prioritize users with similar skills
    if (loggedInUser.skills && loggedInUser.skills.length > 0) {
        usersToBeShownOnFeed = usersToBeShownOnFeed.sort((a, b) => {
            const aMatchCount = a.skills?.filter((skill) => loggedInUser.skills.includes(skill)).length || 0;
            const bMatchCount = b.skills?.filter((skill) => loggedInUser.skills.includes(skill)).length || 0;
            return bMatchCount - aMatchCount;
        });
    }

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all connections successfully",
        data: usersToBeShownOnFeed
    });
});

export { receivedConnectionRequests, allConnections, userFeed };
