// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";

struct Contributor {
    uint256 id;
    address contributor;
    string username;
}

struct Saving {
    uint256 savingId;
    address contributor;
    address[4] contributors;
    uint256[4] contributions;
    uint256 currentRecipientIndex;
}

contract PamojaAppSavingsContract {
    Contributor[] public contributors;
    mapping(address => bool) public contributorExistsInContributors;
    uint256 public savingId;

    Saving[] public savings;
    mapping(address => bool) public contributorExistsInSavings;
    uint256 public contributorId;

    ERC20 CUSDAlfajoresContract =
        ERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);

    function addContributor(string memory username) public {
        if (contributorExistsInContributors[msg.sender]) {
            revert("Contributor already exists.");
        }
        contributors.push(Contributor(contributorId++, msg.sender, username));
        contributorExistsInContributors[msg.sender] = true;
    }

    function getContributor(address id)
        public
        view
        returns (Contributor memory)
    {
        if (!contributorExistsInContributors[msg.sender]) {
            revert("Contributor does not exist.");
        }

        uint256 locationIndex = 0;

        for (uint256 index = 0; index < contributors.length; index++) {
            if (contributors[index].contributor == id) {
                locationIndex = index;
            }
        }

        return contributors[locationIndex];
    }

    function createSaving(uint256 contribution) public {
        // Calculate the amount in the smallest unit of cUSD
        uint256 amount = contribution *
            (10**uint256(CUSDAlfajoresContract.decimals()));
        

        bool success = CUSDAlfajoresContract.transferFrom(msg.sender, address(this), amount);
        
        if (!success) {
            revert("Savings creation failed.");
        }

        Saving memory newSaving;
        newSaving.savingId = savingId++;
        newSaving.contributor = msg.sender;
        newSaving.contributors[0] = msg.sender;
        newSaving.contributions[0] = contribution;
        newSaving.currentRecipientIndex = 0;
        savings.push(newSaving);
    }

    // function withdrawSaving(Saving memory saving, address recipient)
    //     public
    //     returns (bool)
    // {
    //     if (msg.sender != saving.contributor) {
    //         revert("Only the creator of a saving can make a withdrawal.");
    //     }

    //     if (recipient == msg.sender && saving.currentRecipientIndex > 0) {
    //         revert("It seems you already withdrew to your account.");
    //     }

    //     uint256 withdrawalAmount = 0;

    //     for (uint256 index = 0; index < saving.contributions.length; index++) {
    //         withdrawalAmount += saving.contributions[index];
    //     }

    //     bool success = CUSDAlfajoresContract.transfer(
    //         address(this),
    //         withdrawalAmount / 10**18
    //     );

    //     if (success) {
    //         for (uint256 index = 0; index < savings.length; index++) {
    //             if (saving.contributor == savings[index].contributor) {
    //                 savings[index].currentRecipientIndex++;
    //             }
    //         }
    //     }

    //     return success;
    // }
}

// 0x9073DBFEA54Cf7Bc4D4d58931b2CC291E2f00f7c
