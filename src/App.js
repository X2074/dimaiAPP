import {useEffect, useState} from 'react';
import './App.css';
import logo from './logo.png';

import Web3 from 'web3';


function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [prompts, setPrompts] = useState(null);
  const [EID, setEID] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [allEvents, setAllEvents] = useState('');

  const contractAddress = "0xEb3D0F7A2CB21A72C1F558962657De3f5e3ceA03";
  const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldManager","type":"address"},{"indexed":true,"internalType":"address","name":"newManager","type":"address"}],"name":"ManagerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"cost","type":"uint256"},{"indexed":false,"internalType":"string","name":"EID","type":"string"}],"name":"UseDimai","type":"event"},{"inputs":[],"name":"currentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"destroyContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token_","type":"address"}],"name":"setDIMContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newManager","type":"address"}],"name":"setManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"times","type":"uint256"},{"internalType":"string","name":"EID","type":"string"}],"name":"useDimaiByMeer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"EID","type":"string"}],"name":"useDimaiByToken","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];
  const ERC20ABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"cap_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];


  const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
          console.log("Make sure you have Metamask installed!");
          return;
        } else {
          console.log("Wallet exists! We're ready to go!")
        }

        // 8141 = 0x1fcd
        if (ethereum.chainId !== '0x1fcd') {
            console.log("current network:"+ethereum.chainId)
            // alert("Please switch to Amana Network!")
        } else {
            console.log("Current Network is Amana Network!")
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account: ", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }


    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      console.log("Found an account! Address:", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }


  const useDimaiHandler = async () => {
    const msg = document.getElementById("msg").value;
    const number = document.getElementById("num").value;

    try {
        const { ethereum } = window;
        if (ethereum) {
            const web3 = new Web3(ethereum);

            // const provider = new ethers.providers.Web3Provider(ethereum);
            // const signer = provider.getSigner();
            // const contract = new ethers.Contract(contractAddress, abi, provider);
            // const tokenAddress = await contract.methods.tokenAddress().call();
            // console.log("token:"+tokenAddress)
            // const spenderAddress = contractAddress;
            // const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, provider);

            setSubmitted(!submitted);
            const contract = new web3.eth.Contract(abi, contractAddress);
            const tokenAddress = await contract.methods.tokenAddress().call();
            console.log("token:"+tokenAddress)
            const spenderAddress = contractAddress;
            const tokenContract = new web3.eth.Contract(ERC20ABI, tokenAddress);

            const amount = web3.utils.toWei(web3.utils.toBN(number), "ether");
            const gasPrice = await web3.eth.getGasPrice();
            console.log(currentAccount + "\n" + gasPrice + "\n" + amount)

            const currentAllowance = await tokenContract.methods.allowance(currentAccount, spenderAddress).call();

            if (currentAllowance === 0) {
                const initialAllowance = web3.utils.toWei("100","ether")
                await tokenContract.methods.approve(spenderAddress, initialAllowance).send({ from: currentAccount });
                const currentAllowance = await tokenContract.methods.allowance(currentAccount, spenderAddress).call();
                console.log("currentAllowance:"+currentAllowance)
            } else if (currentAllowance < amount) {
                const addAllowance = web3.utils.toWei("100","ether")
                await tokenContract.methods.increaseAllowance(spenderAddress, addAllowance).send({ from: currentAccount });
                const currentAllowance = await tokenContract.methods.allowance(currentAccount, spenderAddress).call();
                console.log("currentAllowance:"+currentAllowance)
            } else {
                const currentAllowance = await tokenContract.methods.allowance(currentAccount, spenderAddress).call();
                console.log("currentAllowance:"+currentAllowance)
            }

            // EID 制作：
            const timestamp = Date.now();
            const EID = web3.utils.toHex("DIM" +"-"+ currentAccount + "-" + timestamp);
            console.log(EID)
            console.log(web3.utils.hexToString(EID))
            setPrompts(msg);
            setEID(web3.utils.hexToString(EID));

            const gasEstimate = await contract.methods.useDimaiByToken(amount, EID).estimateGas({ from: currentAccount })
            const txData = contract.methods.useDimaiByToken(amount, EID).encodeABI();
            web3.eth.sendTransaction({
                from: currentAccount,
                to: contractAddress,
                value: '0x0',
                data: txData,
                gasPrice: gasPrice,
                gasLimit: gasEstimate
            })
                .on('transactionHash', function(hash){
                    console.log("txhsh:"+ hash)
                })
                .once('receipt', function(receipt){
                    console.log("receipt:\n");
                    console.log(receipt);
                    setSubmitted(false);
                })
                .once('confirmation', function(confirmationNumber, receipt){
                    if (confirmationNumber === 1) {
                        console.log("Transaction confirmed!");
                        console.log("confirmationNumber:"+confirmationNumber)
                    }
                })
                .on('error', console.error);

          } else {
            console.log("Ethereum object does not exist");
          }
    } catch (err) {
      console.log(err);
    }
  }


  const contractEvents = () => {

      try {
          const {ethereum} = window;
          if (ethereum) {
              const web3 = new Web3(ethereum);
              const contract = new web3.eth.Contract(abi, contractAddress);
              contract.events.UseDimai()
                  .on('data', function(event){
                      const EID = web3.utils.hexToString(event.returnValues.EID);
                      setAllEvents(EID);
                  })
                  .on('error', console.error);

              // 在需要使用事件数据时，使用 allEvents 变量
              // console.log(allEvents); // 或者使用 alert(allEvents);
          }
      } catch (err) {
          console.log(err);
      }

      return (
          <div>
              Event 🆔：
              <br/>
              {allEvents}
          </div>
      )
  }

  const connectWalletButton = () => {
    return (
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
    )
  }

  const useDimaiButton = () => {
    return (
        <div>
            <div>
                <label className={"signInput"}>
                    Prompts:
                    <input inputMode={"text"} id={"msg"} className={"input"} alt={"input the prompts"}/>
                    <br/>
                    Number:
                    <input inputMode={"numeric"} id={"num"} className={"input"} alt={"input the image number"}/>
                </label>
                <br/>
                <label className={"signResult"}>
                    Prompts: {prompts}
                    <br/>
                    EID: {EID}
                </label>
            </div>
            <div>
                {!submitted?
                    <button onClick={() => useDimaiHandler()} className='cta-button sign-message-button'>
                        Use Dimai
                    </button>
                    :
                    <button className={"cta-button sign-message-button"}>Transaction pending</button>
                }

            </div>
        </div>
    )
  }

  useEffect(() => {
    checkWalletIsConnected().then();
  }, [])

  return (
      <div className="App">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className={"sign-message"}>
          {currentAccount ? useDimaiButton() : connectWalletButton()}
        </div>
        <div>
            {contractEvents()}
        </div>
      </div>
  );
}

export default App;
