// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";

struct Contributor {
    uint256 _id;
    address _address;
    string _username;
}

struct Saving {
    uint256 _id;
    address _creatingContributor;
}

contract PamojaApp {
    Contributor[] private allContributors;
    uint256 private contributorId;
    mapping(address => bool) private contributorExists;

    Saving[] private allSavings;
    uint256 private savingId;

    mapping(uint256 => mapping(uint256 => address))
        private allContributorsInSavings;
    mapping(uint256 => mapping(uint256 => uint256))
        private allContributionsOfSavings;
    mapping(uint256 => uint256) private allRoundsOfSavings;
    mapping(uint256 => uint256) private allNumberOfContributorsInSavings;
    mapping(uint256 => uint256) private allAmountsHeldInSavings;

    Saving[] private contributorSavings;

    ERC20 CUSD = ERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);

    modifier onlyCreatingContributor(uint256 _savingId) {
        require(
            msg.sender == allSavings[_savingId]._creatingContributor,
            "Only Creating Contributor can do this."
        );
        _;
    }

    modifier onlyContributorInSaving(uint256 _savingId) {
        require(
            checkIfContributorExistsInSaving(_savingId, msg.sender),
            "Only a Contributor in the Saving can do this."
        );
        _;
    }

    function addContributorToDirectory(
        string memory _username,
        address _contributorAddress
    ) public returns (bool) {
        if (!checkIfContributorExists(_contributorAddress)) {
            allContributors.push(
                Contributor(contributorId++, _contributorAddress, _username)
            );
            contributorExists[_contributorAddress] = true;
        }
        return true;
    }

    function getContributorIdFromDirectory(address _contributorAddress)
        public
        view
        returns (uint256)
    {
        if (!checkIfContributorExists(_contributorAddress)) {
            revert("Contributor does not exist.");
        }

        uint256 contributorIndex = getContributorIndex(_contributorAddress);

        Contributor memory fetchedContributor = allContributors[
            contributorIndex
        ];

        return fetchedContributor._id;
    }

    function createAmountInSaving(uint256 _amount, address _creatingContributor)
        public
        returns (bool)
    {
        if (!checkIfContributorExists(_creatingContributor)) revert("Creating contributor does not exist");

        Saving memory newSaving;
        newSaving._id = savingId++;
        newSaving._creatingContributor = _creatingContributor;
        allSavings.push(newSaving);

        allContributorsInSavings[newSaving._id][0] = _creatingContributor;
        allContributionsOfSavings[newSaving._id][0] = _amount;

        allRoundsOfSavings[newSaving._id] = 0;

        allNumberOfContributorsInSavings[newSaving._id] = 1;

        allAmountsHeldInSavings[newSaving._id] = _amount;

        return true;
    }

    function updateContributorInSaving(
        uint256 _savingId,
        address _creatingContributor,
        address _newContributor,
        uint256 _amount
    ) public onlyContributorInSaving(_savingId) returns (bool) {
        if (
            !checkIfContributorExists(_creatingContributor) ||
            !checkIfContributorExists(_newContributor)
        ) revert("Contributor does not exist.");

        uint256 oldNumberOfContributorsInSaving = allNumberOfContributorsInSavings[
                _savingId
            ];

        allContributorsInSavings[_savingId][
            oldNumberOfContributorsInSaving
        ] = _newContributor;

        uint256 oldAmountCurrentlyHeldInSavings = allAmountsHeldInSavings[
            _savingId
        ];
        uint256 newAmountCurrentlyHeldInSavings = oldAmountCurrentlyHeldInSavings +
                _amount;

        allContributionsOfSavings[_savingId][
            oldNumberOfContributorsInSaving
        ] = _amount;

        uint256 newNumberOfContributorsInSavings = oldNumberOfContributorsInSaving +
                1;

        allNumberOfContributorsInSavings[
            _savingId
        ] = newNumberOfContributorsInSavings;

        allAmountsHeldInSavings[_savingId] = newAmountCurrentlyHeldInSavings;

        return true;
    }

    function getSaving(uint256 _savingId, address _savingCreator)
        public
        view
        returns (Saving memory)
    {
        if (!checkIfContributorExists(_savingCreator)) {
            revert("Contributor does not exist.");
        }

        uint256 savingIndex = getSavingIndex(_savingId, _savingCreator);

        return allSavings[savingIndex];
    }

    function getAllSavings() public view returns (Saving[] memory) {
        return allSavings;
    }

    function checkIfContributorExistsInSaving(
        uint256 _savingId,
        address _checkingContributor
    ) public view returns (bool) {
        uint256 numberOfContributorsInSavings = allNumberOfContributorsInSavings[
                _savingId
            ];

        for (
            uint256 contributorIndex = 0;
            contributorIndex < numberOfContributorsInSavings;
            contributorIndex++
        ) {
            if (
                allContributorsInSavings[_savingId][contributorIndex] ==
                _checkingContributor
            ) {
                return true;
            }
        }

        return false;
    }

    function getNumberOfContributionsOfContributor(address _contributorAddress)
        public
        view
        returns (uint256)
    {
        uint256 contributionsIndex = 0;

        uint256 lengthOfContributionsOfContributor = 0;

        for (
            uint256 savingsIndex = 0;
            savingsIndex < savingId;
            savingsIndex++
        ) {
            for (
                uint256 contributorIndex = 0;
                contributorIndex <
                allNumberOfContributorsInSavings[savingsIndex];
                contributorIndex++
            ) {
                if (
                    allContributorsInSavings[savingsIndex][contributorIndex] ==
                    _contributorAddress
                ) {
                    lengthOfContributionsOfContributor += 1;
                    contributionsIndex++;
                }
            }
        }

        return contributionsIndex;
    }

    function getContributionsOfContributor(address _contributorAddress)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory contributions = new uint256[](
            getNumberOfContributionsOfContributor(_contributorAddress)
        );

        uint256 contributionsIndex = 0;

        for (
            uint256 savingsIndex = 0;
            savingsIndex < savingId;
            savingsIndex++
        ) {
            for (
                uint256 contributorIndex = 0;
                contributorIndex <
                allNumberOfContributorsInSavings[savingsIndex];
                contributorIndex++
            ) {
                if (
                    allContributorsInSavings[savingsIndex][contributorIndex] ==
                    _contributorAddress
                ) {
                    contributions[
                        contributionsIndex
                    ] = allContributionsOfSavings[savingsIndex][
                        contributorIndex
                    ];
                    contributionsIndex++;
                }
            }
        }

        return contributions;
    }

    function getTotalAmountOfContributionsOfContributor(
        address _contributorAddress
    ) public view returns (uint256) {
        uint256 totalAmount = 0;

        uint256[] memory contributions = getContributionsOfContributor(
            _contributorAddress
        );

        for (
            uint256 contributionIndex = 0;
            contributionIndex < contributions.length;
            contributionIndex++
        ) {
            totalAmount += contributions[contributionIndex];
        }

        return totalAmount;
    }

    function getNumberOfSavingsCreatedByContributor(address _creatingContributor)
        public
        view
        returns (uint256)
    {
        uint256 lengthOfSavingsCreatedByContributor = 0;

        for (
            uint256 savingIndex = 0;
            savingIndex < allSavings.length;
            savingIndex++
        ) {
            if (allSavings[savingIndex]._creatingContributor == _creatingContributor) {
                lengthOfSavingsCreatedByContributor += 1;
            }
        }

        return lengthOfSavingsCreatedByContributor;
    }

    function getSavingsCreatedByContributor(address _creatingContributor)
        public
        view
        returns (Saving[] memory)
    {
        Saving[] memory savingsCreatedByContributor = new Saving[](
            getNumberOfSavingsCreatedByContributor(_creatingContributor)
        );

        for (
            uint256 savingsIndex = 0;
            savingsIndex < savingsCreatedByContributor.length;
            savingsIndex++
        ) {
            savingsCreatedByContributor[savingsIndex] = allSavings[
                savingsIndex
            ];
        }

        return savingsCreatedByContributor;
    }

    function getContributionsOfSaving(uint256 _savingId)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory contributions = new uint256[](
            allNumberOfContributorsInSavings[_savingId]
        );

        for (
            uint256 contributorIndex = 0;
            contributorIndex < allNumberOfContributorsInSavings[_savingId];
            contributorIndex++
        ) {
            contributions[contributorIndex] = allContributionsOfSavings[
                _savingId
            ][contributorIndex];
        }

        return contributions;
    }

    function getAllContributors() public view returns (Contributor[] memory) {
        return allContributors;
    }

    function getCreatingContributor(uint256 _savingId)
        public
        view
        returns (address)
    {
        return allSavings[_savingId]._creatingContributor;
    }

    function withdrawToRecipientContributor(uint256 _savingId)
        public
        onlyCreatingContributor(_savingId)
        returns (bool)
    {
        uint256[] memory contributionsInSavings = getContributionsOfSaving(
            _savingId
        );

        uint256 amountToWithdraw = 0;

        for (
            uint256 contributionIndex = 0;
            contributionIndex < contributionsInSavings.length;
            contributionIndex++
        ) {
            amountToWithdraw += contributionsInSavings[contributionIndex];
        }

        uint256 amountToWithdrawEthers = amountToWithdraw /
            (10**CUSD.decimals());

        bool withdrawalSuccessful = CUSD.transferFrom(
            address(this),
            _getRecipientContributor(_savingId),
            amountToWithdrawEthers
        );

        if (!withdrawalSuccessful) {
            return false;
        }

        allRoundsOfSavings[_savingId] += 1;

        // Check if it was the final withdrawal.
        if (allRoundsOfSavings[_savingId] == contributionsInSavings.length) {
            allRoundsOfSavings[_savingId] = 0;
        }

        _updateContributionsInSaving(_savingId);
        allAmountsHeldInSavings[_savingId] = 0;

        return true;
    }

    function _getRecipientContributor(uint256 _savingId)
        private
        view
        onlyCreatingContributor(_savingId)
        onlyContributorInSaving(_savingId)
        returns (address _recipientContributor)
    {
        uint256 receivingContributorIndex = 0;
        uint256 currentRoundOfSaving = allRoundsOfSavings[_savingId];
        uint256 numberOfContributorsInSaving = allNumberOfContributorsInSavings[
            _savingId
        ];

        if (numberOfContributorsInSaving == 1) {
            return allContributorsInSavings[_savingId][0];
        }

        if (currentRoundOfSaving == 0) {
            receivingContributorIndex = numberOfContributorsInSaving - 1;
        } else {
            receivingContributorIndex =
                numberOfContributorsInSaving -
                currentRoundOfSaving;
        }

        return allContributorsInSavings[_savingId][receivingContributorIndex];
    }

    function _updateContributionsInSaving(uint256 _savingId)
        private
        onlyCreatingContributor(_savingId)
        onlyContributorInSaving(_savingId)
    {
        uint256 numberOfContributorsInSaving = allNumberOfContributorsInSavings[
            _savingId
        ];

        for (uint256 index = 0; index < numberOfContributorsInSaving; index++) {
            allContributionsOfSavings[_savingId][index] = 0;
        }
    }

    function checkIfContributorExists(address _contributorAddress)
        public
        view
        returns (bool)
    {
        return contributorExists[_contributorAddress];
    }

    function getNumberOfContributorSavings(address _contributorAddress)
        public
        view
        returns (uint256)
    {
        uint256 numberOfContributorSavings = 0;

        for (
            uint256 savingIndex = 0;
            savingIndex < allSavings.length;
            savingIndex++
        ) {
            Saving memory runningSaving = allSavings[savingIndex];

            if (runningSaving._creatingContributor == _contributorAddress) {
                numberOfContributorSavings++;
                continue;
            }

            for (
                uint256 contributorIndex = 0;
                contributorIndex < 5;
                contributorIndex++
            ) {
                address runningContributor = msg.sender;

                if (_contributorAddress == runningContributor) {
                    numberOfContributorSavings++;
                    break;
                }
            }
        }

        return numberOfContributorSavings;
    }

    function getContributorIndex(address _contributorAddress)
        public
        view
        returns (uint256)
    {
        uint256 locationIndex = 0;

        for (uint256 index = 0; index < allContributors.length; index++) {
            if (allContributors[index]._address == _contributorAddress) {
                locationIndex = index;
                break;
            }
        }

        return locationIndex;
    }

    function getSavingIndex(uint256 _savingId, address _creatingContributor)
        public
        view
        returns (uint256)
    {
        uint256 savingIndex = 0;

        for (uint256 index = 0; index < allContributors.length; index++) {
            Saving memory runningSaving = allSavings[index];
            if (
                runningSaving._id == _savingId &&
                runningSaving._creatingContributor == _creatingContributor
            ) {
                savingIndex = index;
                break;
            }
        }

        return savingIndex;
    }
}

// _username: andrewkimjoseph
// _contributorAddress: 0xdaB7EB2409fdD974CF93357C61aEA141729AEfF5

// _username: chrisbakke
// _contributorAddress: 0xE49B05F2c7DD51f61E415E1DFAc10B80074B001A

// _username: johnamon
// _contributorAddress: 0x1c30082ae6F51E31F28736be3f715261223E4EDe

// _amount: 5
// _creatingContributor: 0xdaB7EB2409fdD974CF93357C61aEA141729AEfF5

// _savingId: 0
// _creatingContributor: 0xdaB7EB2409fdD974CF93357C61aEA141729AEfF5
// _newContributor: 0xE49B05F2c7DD51f61E415E1DFAc10B80074B001A
// _amount: 10

// _savingId: 0
// _creatingContributor: 0xdaB7EB2409fdD974CF93357C61aEA141729AEfF5
// _newContributor: 0x1c30082ae6F51E31F28736be3f715261223E4EDe
// _amount: 15
