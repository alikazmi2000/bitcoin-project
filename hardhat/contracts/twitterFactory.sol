pragma solidity ^0.8.9;

contract TwitterContract {
    struct Tweet {
        uint256 id;
        address userName;
        bool isDeleted;
        string text;
    }

    Tweet[] private tweets;
    mapping(uint256 => address) tweetToOwner;

    event AddTweet(address recipient, uint256 tweetId);
    event DeleteTweet(uint256 tweetId);

    function addTweet(string memory text) external {
        uint256 tweetId = tweets.length;
        tweets.push(Tweet(tweetId, msg.sender, false, text));
        tweetToOwner[tweetId] = msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }

    function getAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory tempArray = new Tweet[](tweets.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < tweets.length; i++) {
            if (!tweets[i].isDeleted) {
                tempArray[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = tempArray[i];
        }
        return result;
    }

    function getMyTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < tweets.length; i++) {
            if (tweetToOwner[i] == msg.sender && tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function deleteTweet(uint256 tweetId) external {
        require(tweetToOwner[tweetId] == msg.sender);
        tweets[tweetId].isDeleted = true;
        emit DeleteTweet(tweetId);
    }

    function updateTweet(uint256 tweetId, string memory tweetContent) external {
        if (
            tweetToOwner[tweetId] == msg.sender &&
            tweets[tweetId].isDeleted == false
        ) {
            uint256 newTweetId = tweets.length;
            tweets[tweetId].isDeleted = true;
            tweets.push(Tweet(newTweetId, msg.sender, false, tweetContent));
            tweetToOwner[newTweetId] = msg.sender;
        }
    }
}
