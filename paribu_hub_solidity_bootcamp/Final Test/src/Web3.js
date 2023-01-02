import Web3 from 'web3';
import { ethers } from "ethers";
import erc20Abi from './abi.json';

let selectedAccount;

let erc20Contract;

let isInitialized = false;

export const init = async (contractID) => {
	console.log('Initializing...');
	console.log(contractID)
	let provider = window.ethereum;

	if (typeof provider !== 'undefined') {
		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		});
	}

	const web3 = new Web3(provider);

	const networkId = await web3.eth.net.getId();

    let provider_ = new ethers.providers.Web3Provider(window.ethereum);

	erc20Contract = new web3.eth.Contract(
		erc20Abi,
		contractID
	);

	isInitialized = true;
};

export const getCampaignNumber = async (contractID) => {
	if (!isInitialized) {
		await init(contractID);
	}

	let a = await erc20Contract.methods.numberOfCampaigns().call()

	return a;
};

export const checkCampaignGoal = async (contractID,campaignId) => {
	if (!isInitialized) {
		await init(contractID);
	}

	let a = await erc20Contract.methods.checkCampaignGoal(campaignId).call()

	return a;
};

export const donateToCampaign = async (contractID,campaignId,amount) => {
	if (!isInitialized) {
		await init(contractID);
	}

	let a = await erc20Contract.methods.donateToCampaign(campaignId).send({from: selectedAccount, value: ethers.utils.parseEther(amount)})
	console.log(a)
	return a;
};

export const getBlockTimeStamp = async (contractID,campaignDeadline) => {
    if (!isInitialized) {
        await init(contractID);
    }
    
    let a = await erc20Contract.methods.getBlockTimeStamp(Number(campaignDeadline)).call()

    return a;
};

export const createCampaign = async (contractID, campaignOwner, campaignGoal, campaignDeadline) => {
	if (!isInitialized) {
		await init(contractID);
	}
    
	let a = await erc20Contract.methods.createCampaign(campaignOwner, ethers.utils.parseEther(campaignGoal), campaignDeadline).send({from: selectedAccount})
	console.log(a)
	return a;
}

export const getCampaignGoal = async (contractID,campaignId) => {
	if (!isInitialized) {
		await init(contractID);
	}

	let a = await erc20Contract.methods.getCampaignGoal(campaignId).call()

	return a;
}

export const getCampaigns = async (contractID) => {
    if (!isInitialized) {
        await init(contractID);
    }

    let a = await erc20Contract.methods.getCampaigns().call()
    
    return a;
}

export const getTransactions = async (contractID) => {
    if (!isInitialized) {
        await init(contractID);
    }

    let a = await erc20Contract.methods.getTransactions().call()

    return a;
}