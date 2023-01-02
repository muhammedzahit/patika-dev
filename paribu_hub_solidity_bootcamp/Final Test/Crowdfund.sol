//SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

// Kitle fonlama ile alakalı akıllı sözleşme
contract CrowdFunding is ERC20{

    constructor() ERC20('Coin', 'DEV'){
        _mint(msg.sender, 1000*10**18);
    }

    uint public numberOfCampaigns = 0;
    uint public numberOfTransactions = 0;
    uint public totalBalance = 0; // kitle fonlama uygulamasının toplam bağış tutarı

    struct TransactionLog{
        address owner;
        uint256 amount;
        uint256 campaignId;
        bool isDonation;
        uint256 date;
    }

    event CampaignIDLog(uint256 campaign_id);

    struct Campaign{
        address payable owner;
        uint256 id;
        uint256 balance;
        uint256 targetBalance; 
        uint256 deadlineTime;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns; // tüm bağış projelerinin tutulduğu liste
    mapping(uint256 => TransactionLog) public transactions; // tüm işlemlerin tutulduğu liste



    receive() payable external {
        totalBalance += msg.value;
    }

    modifier campaignIdMustBeValid(uint256 campaign_id) {
        // campaign_id toplam kampanya sayısından küçük olmalı
        require(campaign_id < numberOfCampaigns, "campaign id must be valid !!!");
        _;
    }

    // bağış projesi oluştur
    function createCampaign(address payable _owner, uint256 _targetBalance, uint256 _deadline) public{
        // projenin bitiş tarihinin gelecekte olup olmadığını kontrol et.
        require(_deadline > block.timestamp, "deadline must be a date on the future");

        // hedef bakiye 0'dan büyük olmalı
        require(_targetBalance > 0, "target balance must be grater than zero");

        emit CampaignIDLog(numberOfCampaigns);

        // storage keyword'ünü kullandık, çünkü yaptığımız değişiklerin campaigns'e etki etmesini istiyoruz.
        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _owner;
        campaign.balance = 0;
        campaign.id = numberOfCampaigns;
        campaign.deadlineTime = _deadline;
        campaign.targetBalance = _targetBalance;
        campaign.amountCollected = 0;
        numberOfCampaigns += 1;
    }

    function getCampaignGoal(uint256 campaign_id) campaignIdMustBeValid(campaign_id) external view returns(uint256, uint256) {
        Campaign storage campaign = campaigns[campaign_id];
        return (campaign.targetBalance, campaign.balance);
    }

    // Bağış kampanyasının hedefe ulaşıp ulaşmadığını kontrol et.
    // Eğer amaca ulaştıysa kampanyayı oluşturan kişiye toplanan parayı gönder
    function checkCampaignGoal(uint256 campaign_id) campaignIdMustBeValid(campaign_id) public payable {

        Campaign storage campaign = campaigns[campaign_id];

        if(campaign.balance >= campaign.targetBalance){
            campaign.owner.transfer(campaign.balance);
            totalBalance -= campaign.balance;

            TransactionLog storage transaction = transactions[numberOfTransactions];
            transaction.owner = campaign.owner;
            transaction.amount = campaign.balance;
            transaction.campaignId = campaign_id;
            transaction.isDonation = false;
            transaction.date = block.timestamp;

            numberOfTransactions += 1;
        }
    }

    function donateToCampaign(uint256 campaign_id) campaignIdMustBeValid(campaign_id) public payable {

        Campaign storage campaign = campaigns[campaign_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        totalBalance += msg.value;

        campaign.balance += msg.value;

        TransactionLog storage transaction = transactions[numberOfTransactions];
        transaction.owner = msg.sender;
        transaction.amount = msg.value;
        transaction.campaignId = campaign_id;
        transaction.isDonation = true;
        transaction.date = block.timestamp;

        numberOfTransactions += 1;

        checkCampaignGoal(campaign_id);
    }

    function getBlockTimeStamp(uint256 _days) public view returns(uint256){
        if(_days > 0){
            return block.timestamp + (_days * 1 days);
        }
        
        return block.timestamp;
    }

    function getCampaigns() public view returns(Campaign[] memory){
       Campaign[] memory res = new Campaign[](numberOfCampaigns);
       for(uint i=0; i<numberOfCampaigns; i++){
           Campaign storage campaign = campaigns[i];
           res[i] = campaign;
       }
       return res;
    }

    function getTransactions() public view returns(TransactionLog[] memory){
        TransactionLog[] memory res = new TransactionLog[](numberOfTransactions);
        for(uint i=0; i<numberOfTransactions; i++){
            TransactionLog storage transaction = transactions[i];
            res[i] = transaction;
        }
        return res;
    }

}