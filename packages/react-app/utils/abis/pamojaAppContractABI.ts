export const pamojaAppContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "addContributorToDirectory",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_newContributorAddress",
				"type": "address"
			}
		],
		"name": "addNewContributorToSaving",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "checkIfContributorExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "checkIfContributorExistsInSaving",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "checkIfContributorIsCreatingContributor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_creatingContributorAddress",
				"type": "address"
			}
		],
		"name": "createNewSaving",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_contributorIndex",
				"type": "uint256"
			}
		],
		"name": "getAddressOfContributorInSavings",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "getAddressesOfContributorsOfSaving",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllContributors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_username",
						"type": "string"
					}
				],
				"internalType": "struct Contributor[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSavings",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_creatingContributor",
						"type": "address"
					}
				],
				"internalType": "struct Saving[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "getContributionsOfContributor",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "getContributionsOfSaving",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "getContributor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_username",
						"type": "string"
					}
				],
				"internalType": "struct Contributor",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "getContributorIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "getCreatingContributor",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "getCurrentRoundOfSaving",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "getNumberOfAllContributorSavings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "getNumberOfContributionsOfContributor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_creatingContributorAddress",
				"type": "address"
			}
		],
		"name": "getNumberOfSavingsCreatedByContributor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "getRecipientContributorAddressOfSaving",
		"outputs": [
			{
				"internalType": "address",
				"name": "_recipientContributorAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_creatingContributorAddress",
				"type": "address"
			}
		],
		"name": "getSaving",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_creatingContributor",
						"type": "address"
					}
				],
				"internalType": "struct Saving",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_creatingContributorAddress",
				"type": "address"
			}
		],
		"name": "getSavingIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_creatingContributorAddress",
				"type": "address"
			}
		],
		"name": "getSavingsCreatedByContributor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_creatingContributor",
						"type": "address"
					}
				],
				"internalType": "struct Saving[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "getSavingsOfContributor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_creatingContributor",
						"type": "address"
					}
				],
				"internalType": "struct Saving[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contributorAddress",
				"type": "address"
			}
		],
		"name": "getTotalAmountOfContributionsOfContributor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "getWithdrawalAmountFromSaving",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "makeWithdrawalToRecipientContributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_newContributorAddress",
				"type": "address"
			}
		],
		"name": "updateAmountForNewContributorInSaving",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "updateSavingAfterWithdrawal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


