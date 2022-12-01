import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import TwitterAbi from "./abi/TwitterContract.json"
import { FaTrash } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentTweet, setCurrentTweet] = useState('')
  const [signer, setSigner] = useState(undefined)
  const [tweetArray, setTweetArray] = useState([])
  const [updatedTweet, setUpdatedTweet] = useState({
    id: '',
    text: '',
  });
  const getAllTweets = async () => {
    try {
      const { ethereum } = window
      debugger;
      if (ethereum && signer) {
        const TwitterContract = new ethers.Contract(
          process.env.REACT_APP_CONTRACT_URL,
          TwitterAbi.abi,
          signer
        )

        let allTweets = await TwitterContract.getAllTweets();
        if (allTweets) {
          setTweetArray(allTweets);
        }
        // setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllTweets();
  }, [signer])
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8 mt-3 mx-auto'>
          <div className='row'>
            <div className='col-5'>
              <input class="form-control form-control-lg"
                type="text" placeholder="Insert Tweet"
                onChange={(e) => setCurrentTweet(e.target.value)}
                aria-label=".form-control-lg example" />

            </div>
            <div className='col-2'>
              <button disabled={!signer} type="button" onClick={async () => {
                console.log(process.env.REACT_APP_CONTRACT_URL)
                const TwitterContract = new ethers.Contract(
                  process.env.REACT_APP_CONTRACT_URL,
                  TwitterAbi.abi,
                  signer
                )

                let twitterTx = await TwitterContract.addTweet(currentTweet);
                if (twitterTx) {
                  toast("Tweet Add Request Sent")

                }
                console.log(twitterTx);
              }} class="btn btn-primary">Add Tweet</button>

            </div>
            <div className='col-2'>
              <button type="button"
                onClick={async () => {
                  try {
                    const { ethereum } = window
                    if (ethereum) {
                      window.ethereum.request({ method: 'eth_requestAccounts' })
                        .then(res => {
                          // Return the address of the wallet
                          const provider = new ethers.providers.Web3Provider(ethereum);
                          const signer = provider.getSigner();
                          setSigner(signer);
                        })

                    } else {
                      console.log("Ethereum object doesn't exist");
                    }
                  } catch (error) {
                    console.log(error);
                  }


                }}
                class="btn btn-danger">Metamask</button>

            </div>
            <div className='col-2'>
              <button disabled={!signer} type="button" onClick={async () => {
                getAllTweets()

              }} class="btn btn-primary">Reload</button>

            </div>
          </div>

        </div>
      </div>
      <div className='row'>
        <div className='col-8 mx-auto'>
          <ol class="list-group list-group-numbered">
            {tweetArray && (
              tweetArray.map(e => {
                return (
                  <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                      <input type="text" onKeyUp={async (event) => {
                        debugger;
                        if (event.code == "Enter") {
                          const TwitterContract = new ethers.Contract(
                            process.env.REACT_APP_CONTRACT_URL,
                            TwitterAbi.abi,
                            signer
                          )

                          let twitterTx = await TwitterContract.updateTweet(updatedTweet.id, updatedTweet.text);
                          console.log(twitterTx);

                          if (twitterTx) {
                            toast("Tweet Update Request Sent")

                          }
                        }
                      }} defaultValue={e && e.text || ""} onChange={(current) => {
                        setUpdatedTweet({
                          id: e.id,
                          text: current.target.value
                        })
                      }} />
                      <span>{e && e.userName || "N/A"}</span>

                    </div>
                    <div>
                      <span><FaTrash onClick={async () => {
                        const TwitterContract = new ethers.Contract(
                          process.env.REACT_APP_CONTRACT_URL,
                          TwitterAbi.abi,
                          signer
                        )

                        let twitterTx = await TwitterContract.deleteTweet(e.id);
                      }} style={{ color: "red" }} /></span>
                    </div>
                  </li>

                )
              })
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
