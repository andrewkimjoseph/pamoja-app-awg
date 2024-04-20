import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnotherSaving, Saving } from "@/utils/types/saving";
import { _fundAmountInSaving } from "@/services/fundAmountInSaving";
import { useAccount } from "wagmi";
import Snackbar from "@/components/snackbar";
import { getSavingsOfContributor } from "@/services/getSavingsOfContributor";
// import { createNewSaving } from "@/services/createNewSaving";
import Spinner from "@/components/spinner";
import { createNewSaving } from "@/services/createNewSaving";

const SavingsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [fundAmount, setFundAmount] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [savings, setSavings] = useState<Saving[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address, isConnected } = useAccount();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showAddContributorModal, setshowAddContributorModal] = useState(false);

  const [newContributorAddress, setNewContributorAddress] = useState("");

  useEffect(() => {
    const fetchSavings = async () => {
      const savingsData = await getSavingsOfContributor(address, address);
      setSavings(savingsData);
      setIsLoading(false);
    };
    fetchSavings();
  }, []);

  const handleCreateSaving = () => {
    setShowCreateModal(true);
  };

  const handleAddContributor = async () => {
    setIsSubmitting(true);
    const success = await _fundAmountInSaving(address, {
      _amount: fundAmount,
      _creatingContributor: address as string,
    });

    if (success) {
      await createNewSaving(address, {
        _amount: fundAmount,
        _creatingContributor: address as string,
      });

      setIsSubmitting(false);
      setShowCreateModal(false);
      setSnackbarMessage("You successfully funded and created your saving.");
      setShowSnackbar(true);
      const updatedSavings = await getSavingsOfContributor(address, address);
      setSavings(updatedSavings);
    } else {
      setIsSubmitting(false);
      setShowCreateModal(false);
      setSnackbarMessage("Funding the saving was rejected");

      setShowSnackbar(true);
      setShowCreateModal(false);
      setFundAmount(0);
    }
  };
  const handleFundAmountInSaving = async () => {
    setIsSubmitting(true);
    const success = await _fundAmountInSaving(address, {
      _amount: fundAmount,
      _creatingContributor: address as string,
    });

    if (success) {
      const createAmountSuccess = await createNewSaving(address, {
        _amount: fundAmount,
        _creatingContributor: address as string,
      });

      setIsSubmitting(false);
      setShowCreateModal(false);
      setSnackbarMessage("You successfully funded and created your saving.");
      setShowSnackbar(true);
      const updatedSavings = await getSavingsOfContributor(address, address);
      setSavings(updatedSavings);
    } else {
      setIsSubmitting(false);
      setShowCreateModal(false);
      setSnackbarMessage("Funding the saving was rejected");

      setShowSnackbar(true);
      setShowCreateModal(false);
      setFundAmount(0);
    }
  };

  // Display loading spinner while savings are being fetched
  if (isLoading) {
    return (
      <div className="container mx-auto bg-pa_two flex flex-col justify-start items-center min-h-screen w-5/6">
        {/* Replace 'Spinner' with your spinner component */}
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-pa_two flex flex-col justify-start items-left min-h-screen w-5/6">
      <div className="">
        <h1 className="text-2xl font-bold mb-6">Savings</h1>
        <button
          onClick={handleCreateSaving}
          className="bg-pa_three hover:bg-pa_two text-pa_one font-bold py-2 px-4 pt-2 rounded border border-pa_one"
        >
          Create a saving
        </button>
      </div>

      <div className="">
        <h2 className="text-xl font-bold pt-8 pb-2">All Your Savings</h2>
        <div className="">
          {savings.length == 0 && (
            <div>
              <p>Your savings will appear here... </p>
            </div>
          )}
          {savings.map((saving) => (
            <div
              key={saving._id}
              className="bg-pa_one text-white  p-3 rounded-lg shadow-md"
            >
              <p className="text font-semibold">savingId: {saving._id}</p>
              {saving._creatingContributor === address ? (
                <button className="mt-4 bg-pa_three text-pa_one font-bold py-2 px-4 rounded">
                  <Link href={`/savings/${saving._id}`}>Explore</Link>
                </button>
              ) : null}
                   {saving._creatingContributor !== address ? (
                <button className="mt-4 bg-pa_three text-pa_one font-bold py-2 px-4 rounded">
                  <Link href={`/savings/${saving._id}`}>See saving</Link>
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-pa_three p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCreateModal(false)}
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
            <h2 className="text-xl font-bold mb-4">Create a saving</h2>
            <h2 className="font-normal mb-4 pt-1">
              Enter the amount per person.
            </h2>
            <h2 className="font-bold mb-4 pt-1">Please note: </h2>

            <h2 className="font-normal italic mb-4 pb-4">
              - You will be charged the amount entered{" "}
            </h2>
            <input
              type="text"
              value={fundAmount}
              onChange={(e) => setFundAmount(Number(e.target.value))}
              className="border border-gray-400 p-2 rounded mb-4 w-full"
              placeholder="Enter amount"
            />

            <div className="flex justify-end">
              <button
                className="mt-4 bg-pa_one text-pa_two font-bold py-2 px-4 rounded flex items-center"
                onClick={handleFundAmountInSaving}
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

      {showAddContributorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-pa_three p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setshowAddContributorModal(false)}
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
            <h2 className="text-xl font-bold mb-4">Create a saving</h2>
            <h2 className="font-normal mb-4 pt-1">
              Enter the amount per person.
            </h2>
            <h2 className="font-bold mb-4 pt-1">Please note: </h2>

            <h2 className="font-normal italic mb-4 pb-4">
              - You will be charged the amount entered{" "}
            </h2>
            <input
              type="text"
              value={fundAmount}
              onChange={(e) => setNewContributorAddress(e.target.value)}
              className="border border-gray-400 p-2 rounded mb-4 w-full"
              placeholder="Enter amount"
            />

            <div className="flex justify-end">
              <button
                className="mt-4 bg-pa_one text-pa_two font-bold py-2 px-4 rounded flex items-center"
                onClick={handleAddContributor}
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
    </div>
  );
};

export default SavingsPage;
