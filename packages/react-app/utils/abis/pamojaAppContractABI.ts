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
				"internalType": "address",
				"name": "_creatingContributor",
				"type": "address"
			}
		],
		"name": "createAmountInSaving",
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
				"name": "_creatingContributor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_newContributor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "updateContributorInSaving",
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
		"name": "withdrawToRecipientContributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
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
				"internalType": "uint256",
				"name": "_savingId",
				"type": "uint256"
			}
		],
		"name": "getContributingCreator",
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
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getContributorFromDirectory",
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
				"name": "_address",
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
			},
			{
				"internalType": "address",
				"name": "_savingCreator",
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
				"internalType": "address",
				"name": "_contributorAddress",
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
	}
]