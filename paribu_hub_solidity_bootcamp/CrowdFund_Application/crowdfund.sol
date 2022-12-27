//SPDX-License-Identifier: MIT
pragma solidity ^0.8;

// Kitle fonlama ile alakalı akıllı sözleşme
contract CrowdFunding{

    uint public numberOfCampaigns = 0;
    uint public totalBalance = 0; // kitle fonlama uygulamasının toplam bağış tutarı

    event CampaignIDLog(uint256 campaign_id);

    struct Campaign{
        address payable owner;
        uint256 balance;
        uint256 targetBalance; 
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns; // tüm bağış projelerinin tutulduğu liste


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
        }
    }

    function donateToCampaign(uint256 campaign_id) campaignIdMustBeValid(campaign_id) public payable {

        Campaign storage campaign = campaigns[campaign_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        totalBalance += msg.value;

        campaign.balance += msg.value;

        checkCampaignGoal(campaign_id);
    }

    function getBlockTimeStamp() public view returns(uint256){
        return block.timestamp;
    }

}