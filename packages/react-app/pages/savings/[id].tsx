import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getContributionsOfSaving } from "@/services/getContributionsOfSaving";
import { Contribution } from "@/utils/types/contributions";
import { getAddressOfContributorInSavings } from "@/services/getAddressOfContributorInSavings";
import { getContributor } from "@/services/getContributor";
import Snackbar from "@/components/snackbar";
import { addNewContributorToSaving } from "@/services/addNewContributorToSaving";
import { Contributor } from "@/utils/types/contributor";
import { getCreatingContributor } from "@/services/getCreatingContributor";
import { getAddressesOfContributorsOfSaving } from "@/services/getAddressesOfContributorsOfSavings";
import { _fundAmountInSaving } from "@/services/fundAmountInSaving";
import { updateAmountForContributorInSaving } from "@/services/updateAmountForContributorInSaving";
import FundingDialog from "@/components/fundingDialog";
import WithdrawingDialog from "@/components/withdrawingDialog";
import { updateSavingAfterWithdrawal } from "@/services/updateSavingAfterWithdrawal";
import { getRecipientContributorOfSaving } from "@/services/getRecipientContributorOfSaving";
import { withdrawToRecipientContributor } from "@/services/withdrawToRecipientContributor";
import { Saving } from "@/utils/types/saving";
import { getSaving } from "@/services/getSaving";

const SavingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { address, isConnected } = useAccount();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isRevealingContributor, setIsRevealingContributor] = useState<
    boolean[]
  >([]);

  const [isFundingSaving, setIsFundingSaving] = useState<boolean[]>([]);
  const [showAddContributorModal, setShowAddContributorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showFundingDialog, setShowFundingDialog] = useState<boolean>(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState<boolean>(false);

  const [newContributorAddress, setNewContributorAddress] = useState("");

  const [creatingContributor, setCreatingContributor] = useState("");

  const [contributor, setContributor] = useState<Contributor>();
  const [showSaving, setShowSaving] = useState<Saving>();

  const [recipientContributor, setReceipientContributor] =
    useState<Contributor>();

  const [addressesOfContributors, setAddressesOfContributors] = useState<[]>();

  useEffect(() => {
    const fetchContributorAddresses = async () => {
      try {
        // Call the API function to get addresses of contributors
        const addresses = await getAddressesOfContributorsOfSaving(
          address,
          Number(id)
        ); // Update this with your actual API call
        setAddressesOfContributors(addresses);
      } catch (error) {
        // Handle error
      }
    };
    const fetchSavings = async () => {
      try {
        const savingsData = await getContributionsOfSaving(address, Number(id));
        setContributions(savingsData);
      } catch (error) {}
    };

    const currentSaving = async () => {
      try {
        const saving = await getSaving(address, {
          _savingId: Number(id),
          _creatingContributorAddress: String(addressesOfContributors?.at(0)),
        });
        setShowSaving(saving!);
        console.log(saving);
      } catch (error) {}
    };

    const currentContributor = async () => {
      try {
        const contributor = await getContributor(address, address as string);
        setContributor(contributor!);
      } catch (error) {}
    };

    const receipientContributor = async () => {
      try {
        const receipientContributorAddress =
          await getRecipientContributorOfSaving(address, {
            _savingId: Number(id),
          });

        const recipientContributor = await getContributor(
          address,
          receipientContributorAddress as string
        );
        setReceipientContributor(recipientContributor!);
      } catch (error) {}
    };

    const creatingContributor = async () => {
      try {
        const contributor = await getCreatingContributor(address, Number(id));
        setCreatingContributor(contributor!);
      } catch (error) {}
    };

    setIsRevealingContributor(Array<boolean>(contributions.length).fill(false));
    setIsFundingSaving(Array<boolean>(contributions.length).fill(false));
    fetchSavings();
    currentContributor();
    creatingContributor();
    receipientContributor();
    fetchContributorAddresses();
    currentSaving();
  }, []);

  const setIsRevealingContributorAtIndex = (
    index: number,
    value: boolean
  ): void => {
    setIsRevealingContributor((prev: boolean[]) => {
      const newArray: boolean[] = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const setIsFundingSavingAtIndex = (index: number, value: boolean): void => {
    setIsFundingSaving((prev: boolean[]) => {
      const newArray: boolean[] = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const handleAddContributor = async () => {
    setShowAddContributorModal(true);
  };

  const handleNewContributorSubmission = async () => {
    setIsSubmitting(true);
    const added = await addNewContributorToSaving(
      address,
      { _savingId: Number(id), _newContributorAddress: newContributorAddress } // Pass the saving ID
    );

    const contributor = await getContributor(address, newContributorAddress);

    if (added) {
      setShowAddContributorModal(false);

      setSnackbarMessage(
        `${contributor?._username as string} added to your saving`
      );
      setShowSnackbar(true);
      setIsSubmitting(false);
    } else {
      setSnackbarMessage(`Failed. Confirm if person in already onboarded`);
      setShowSnackbar(true);
      setIsSubmitting(false);
    }
  };

  const revealContributor = async (contributorIndex: number) => {
    try {
      setIsRevealingContributorAtIndex(contributorIndex, true); // Reset the state once the revealing process is completed
      const fetchedAddress = await getAddressOfContributorInSavings(address, {
        _savingId: Number(id),
        _contributorIndex: contributorIndex,
      });
      const contributor = await getContributor(address, fetchedAddress!);
      setSnackbarMessage(contributor?._username as string);
      setShowSnackbar(true);
    } catch (error) {
      console.error("Error fetching contributor:", error);
      // Handle error
    } finally {
      setIsRevealingContributorAtIndex(contributorIndex, false); // Reset the state once the revealing process is completed
    }
  };

  const openConfirmationDialog = async () => {
    const contributionIndex = Number(
      addressesOfContributors?.findIndex((item) => item === address)
    );
    setShowFundingDialog(true);
    setIsFundingSavingAtIndex(contributionIndex, true);
  };

  const closeConfirmationDialog = async () => {
    setShowFundingDialog(false);
    const contributionIndex = Number(
      addressesOfContributors?.findIndex((item) => item === address)
    );
    setIsFundingSavingAtIndex(contributionIndex, false);
  };

  const openWithdrawDialog = async () => {
    setWithdrawing(true);
    setShowWithdrawDialog(true);
  };

  const closeWithdrawDialog = async () => {
    setWithdrawing(false);
    setShowWithdrawDialog(false);
  };

  const handleWithdrawal = async () => {
    // Call the withdrawToRecipientContributor function
    setShowWithdrawDialog(false);

    setWithdrawing(true);
    const success = await withdrawToRecipientContributor(
      address,
      { _savingId: Number(id) } // Pass the saving ID
    );

    if (success) {
      await updateSavingAfterWithdrawal(address, {
        _savingId: Number(id),
      });

      setSnackbarMessage(`Withdrawal made and records updated.`);
      setShowSnackbar(true);
      setWithdrawing(false);
    } else {
      setSnackbarMessage(`Failed. Try again.`);
      setWithdrawing(false);

      setShowSnackbar(true);
    }
  };

  const makeFunding = async () => {
    setShowFundingDialog(false);
    const contributionIndex = Number(
      addressesOfContributors?.findIndex((item) => item === address)
    );
    setIsFundingSavingAtIndex(contributionIndex, true);

    const amount = Number(showSaving?._amount);

    const success = await _fundAmountInSaving(address, {
      _amount: amount,
      _creatingContributor: String(addressesOfContributors?.at(0)),
    });

    if (success) {
      await updateAmountForContributorInSaving(address, {
        _amount: amount,
        _savingId: Number(id),
        _newContributorAddress: address as string,
      });
      setSnackbarMessage(`Funding made and records updated.`);
      setShowSnackbar(true);
      setIsFundingSavingAtIndex(contributionIndex, false);
    } else {
      setSnackbarMessage(`Failed. Try again.`);
      setShowSnackbar(true);
      setIsFundingSavingAtIndex(contributionIndex, false);
    }
  };

  return (
    <div className=" h-screen px-2 px-4">
      <h1 className="text-xl font-bold text-bg_one">
        Interacting with Saving: {id}
      </h1>
      <div className="flex justify-between">
        {creatingContributor === address && (
          <button
            className="mt-4 mr-2 bg-pa_one text-white font-bold py-2 px-4 rounded border-b-2 border-pa_one pr-4"
            onClick={() => handleAddContributor()} // Call handleAddContributor function on button click
          >
            Add contributor
          </button>
        )}

        {creatingContributor === address &&
          contributions.reduce(
            (acc, contribution) => acc + contribution._amount,
            0
          ) > 0 && (
            <button
              className="mt-4 bg-pa_three text-pa_one py-2 px-4 rounded border-b-2 border-pa_one"
              onClick={openWithdrawDialog} // Call handleWithdrawal function on button click
            >
              {withdrawing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pa_one"></div>
              ) : (
                "Withdraw current round"
              )}
            </button>
          )}
      </div>
      <div className="">
        <h2 className="text-xl font-bold pt-8 pb-2">All Contributions</h2>
        <div className="">
          {contributions.length === 0 && (
            <div>
              <p>Contributions for this Saving will appear here... </p>
            </div>
          )}
          {contributions.map((contribution) => (
            <div
              key={contribution._index}
              className="bg-pa_one text-white  p-3 rounded-lg shadow-md mb-4"
            >
              <p className="text font-semibold">
                contributionAmount: {contribution._amount} cUSD{" "}
              </p>

              <button
                className="mt-4 bg-pa_three text-pa_one font-bold py-2 px-4 rounded"
                onClick={() => revealContributor(contribution._index)}
              >
                {isRevealingContributor?.at(contribution._index) ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pa_one"></div>
                ) : contribution._index === 0 ? (
                  "Reveal creatingContributor"
                ) : (
                  "Reveal contributor"
                )}
              </button>
              {address === addressesOfContributors?.at(contribution._index) &&
                contribution._amount === 0 && (
                  <button
                    className="mt-4 ml-4 bg-pa_four text-pa_one font-bold py-2 px-4 rounded"
                    onClick={openConfirmationDialog}
                  >
                    {isFundingSaving?.at(contribution._index) ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pa_one"></div>
                    ) : (
                      "Fund saving"
                    )}
                  </button>
                )}
            </div>
          ))}
        </div>
      </div>

      {showAddContributorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-pa_three p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddContributorModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Add a contributor</h2>
            <h2 className="font-normal mb-4 pt-1">Paste the address here.</h2>
            <h2 className="font-bold mb-4 pt-1">Please note: </h2>

            <h2 className="font-normal italic mb-4 pb-4">
              - They won't be charged
            </h2>
            <input
              type="text"
              value={newContributorAddress}
              onChange={(e) => setNewContributorAddress(e.target.value)}
              className="border border-gray-400 p-2 rounded mb-4 w-full"
              placeholder="Paste address"
            />

            <div className="flex justify-end">
              <button
                className="mt-4 bg-pa_one text-pa_two font-bold py-2 px-4 rounded flex items-center"
                onClick={handleNewContributorSubmission}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pa_two"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
            <div className="flex justify-end">
              {/* <button
                className="mt-4 bg-pa_one text-pa_two py-2 px-4 rounded flex items-center"
                onClick={handleFundAmountInSaving}
              >
                Create saving
              </button> */}
            </div>
          </div>
        </div>
      )}

      <Snackbar
        isOpen={showSnackbar}
        message={snackbarMessage}
        onClose={() => setShowSnackbar(false)}
      />

      <FundingDialog
        isOpen={showFundingDialog} // Pass the state to control the dialog's visibility
        onClose={closeConfirmationDialog} // Function to close the dialog
        onConfirm={makeFunding} // Function to handle confirmation
        amount={Number(showSaving?._amount)}
      />

      <WithdrawingDialog
        isOpen={showWithdrawDialog} // Pass the state to control the dialog's visibility
        onClose={closeWithdrawDialog} // Function to close the dialog
        onConfirm={handleWithdrawal} // Function to handle confirmation
        amount={Number(
          contributions.reduce((total, contribution) => {
            return total + contribution._amount;
          }, 0)
        )}
        username={String(recipientContributor?._username)}
      />
    </div>
  );
};

export default SavingPage;
