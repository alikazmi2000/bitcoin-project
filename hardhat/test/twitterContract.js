const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Twitter Contract", function () {
    let TwitterContract;
    let twitter;
    let myAddress;

    const TOTAL_TWEETS = 8;


    let tweetArray;

    beforeEach(async function () {
        TwitterContract = await ethers.getContractFactory("TwitterContract");
        twitter = await TwitterContract.deploy();
        [myAddress, randAddress] = await ethers.getSigners();

        tweetArray = [];

        for (let i = 0; i < TOTAL_TWEETS; i++) {
            let address =  i % 2 == 0 ? randAddress : myAddress
            let tweet = {
                'text': 'hello rand text val' + i,
                'userName': address,
                'isDeleted': false
            };

            await twitter.connect(address).addTweet(tweet.text);
            tweetArray.push(tweet);
        }

        
    });

    describe("Add Tweet", function () {
        it("should emit AddTweet event", async function () {
            let tweet = {
                'text': 'My Tweet is crated',
                'isDeleted': false
            };

            await expect(await twitter.addTweet(tweet.text)
            ).to.emit(twitter, 'AddTweet').withArgs(myAddress.address, TOTAL_TWEETS);
        })
    });

    describe("Get All Tweets", function () {
        it("should return the correct number of total tweets", async function () {
            const tweetsFromChain = await twitter.getAllTweets();
            expect(tweetsFromChain.length).to.equal(TOTAL_TWEETS);
        })

        it("should return the correct number of all my tweets", async function () {
            const myTweetsFromChain = await twitter.getMyTweets();
            expect(myTweetsFromChain.length).to.equal(4);
        })
    })

    describe("Delete Tweet", function () {
        it("should emit delete tweet event", async function () {
            const TWEET_ID = 0;
            const TWEET_DELETED = true;

            await expect(
                twitter.connect(randAddress).deleteTweet(TWEET_ID)
            ).to.emit(
                twitter, 'DeleteTweet'
            ).withArgs(
                TWEET_ID
            );
        })
    })
});