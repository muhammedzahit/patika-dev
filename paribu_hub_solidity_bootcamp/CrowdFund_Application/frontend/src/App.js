import React, { useState } from 'react';
import Web3 from 'web3';

import { getCampaignNumber, createCampaign, getCampaignGoal, donateToCampaign } from './Web3';
import TextComponent from './TextComponent';

function App() {

	const [log, setLog] = useState('');
	const [contractID, setContractID] = useState('');
	const [campaignOwner, setCampaignOwner] = useState('');
	const [campaignGoal, setCampaignGoal] = useState('');
	const [campaignDeadline, setCampaignDeadline] = useState('');
	const [campaignID, setCampaignID] = useState('');
	const [donationAmount, setDonationAmount] = useState('');

	return (
		<div className="App">
			{log && 
			<div>
				<h2
				style={{fontStyle : "italic"}}
				>{log}</h2>
				<br />

			</div>			
			}

			<TextComponent
				title = "Get Number of Campaigns"
				onSubmit={() => {
					if(!contractID){
						setLog('Please set contract ID first');
						return;
					}
					getCampaignNumber(contractID).then((res) => {
						setLog('Number of Campaigns: ' + res);
					});
				}}
				buttonText="Get Campaign Number"
			/>

			<TextComponent 
				title = 'Donate To Campaign'
				textfields={[
					{
						name : 'campaignID',
						label : 'Campaign ID',
						value : campaignID,
						onChange : (e) => {
							setCampaignID(parseInt(e.target.value));
						},
					},
					{
						name : 'donationAmount',
						label : 'Donation Amount',
						value : donationAmount,
						onChange : (e) => {
							setDonationAmount(e.target.value);
						}
					}
				]}
				onSubmit={() => {
					if(!contractID){
						setLog('Please set contract ID first');
						return;
					}
					donateToCampaign(contractID,campaignID,donationAmount).then((res) => {
						if(res.status){
							setLog('Donation Successful');
						}
						else{
							setLog('Donation Failed');
						}
					});
				}}
				buttonText="Donate"
			/>

			<TextComponent 
				title = 'Create Campaign'
				textfields={[
					{
						name: 'campaignOwner',
						label: 'Campaign Owner',
						value: campaignOwner,
						onChange: (e) => {
							setCampaignOwner(e.target.value);
						},
					},
					{
						name : 'campaignDeadline',
						label : 'Campaign Deadline',
						value : campaignDeadline,
						onChange : (e) => {
							setCampaignDeadline(parseInt(e.target.value));
						},
					},
					{
						name : 'campaignGoal',
						label : 'Campaign Goal',
						value : campaignGoal,
						onChange : (e) => {
							setCampaignGoal(e.target.value);
						},
					},
				]}
				onSubmit={() => {
					if(!contractID){
						setLog('Please set contract ID first');
						return;
					}
					createCampaign(contractID,campaignOwner, campaignGoal,campaignDeadline).then((res) => {
						if(res.status){
							console.log(res)
							setLog('Campaign Created, Your Campaign ID is ' + res.events.CampaignIDLog.returnValues.campaign_id);
							return;
						}
						else{
							setLog('Campaign Creation Failed');
							return;
						}
					});
				}}
				buttonText="Create Campaign"	
			/>

			<TextComponent 
				title = 'Get Campaign Goal'
				textfields={[
					{
						name: 'campaignID',
						label: 'Campaign ID',
						value: campaignID,
						onChange: (e) => {
							setCampaignID(e.target.value);
						},
					},
				]}
				onSubmit={() => {
					if(!contractID){
						setLog('Please set contract ID first');
						return;
					}
					getCampaignGoal(contractID,campaignID).then((res) => {
						// eslint-disable-next-line no-multi-str
						setLog("Campaign Goal: " + Web3.utils.fromWei(res[0], 'ether') + " ETH " +  " // Current Balance: " + Web3.utils.fromWei(res[1], 'ether') + " ETH ");
					});
				}}
				buttonText="Get Campaign Goal"
			/>

			<TextComponent 
				title = 'Set Contract ID'
				textfields={[
					{
						name: 'contractID',
						label: 'Contract ID',
						value: contractID,
						onChange: (e) => {
							setContractID(e.target.value);
						},
					},
				]}
				onSubmit={() => {
					setLog('Contract ID Setted to ' + contractID);
				}}
				buttonText="Set Contract ID"
			/>

		</div>
	);
}

export default App;