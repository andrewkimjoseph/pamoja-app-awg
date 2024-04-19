import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnotherSaving, Saving } from "@/utils/types/saving";
import { _fundAmountInSaving } from "@/services/_fundAmountInSaving";
import { useAccount } from "wagmi";
import Snackbar from "@/components/snackbar";
import { getSavingsOfContributor } from "@/services/getSavingsOfContributor";
import { createAmountInSaving } from "@/services/createAmountInSaving";
import Spinner from "@/components/spinner";

const SavingsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [fundAmount, setFundAmount] = useState(0);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [savings, setSavings] = useState<Saving[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading spinner
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchSavings = async () => {
      const savingsData = await getSavingsOfContributor(address, address);
      setSavings(savingsData);
      setIsLoading(false); // Set loading state to false once savings are fetched
    };
    fetchSavings();
  }, []);

  const handleCreateSaving = () => {
    setShowCreateModal(true);
  };

  const handleFundAmountInSaving = async () => {
    const success = await _fundAmountInSaving(address, {
      _amount: fundAmount,
      _creatingContributor: address,
    });

    if (success) {
      const createAmountSuccess = await createAmountInSaving(address, {
        _amount: fundAmount,
        _creatingContributor: address,
      });

      setShowCreateModal(false);
      setShowSuccessSnackbar(true);
      const updatedSavings = await getSavingsOfContributor(address, address);
      setSavings(updatedSavings);
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
        <h2 className="text-xl font-bold pt-8 pb-2">Your Savings</h2>
        <div className="">
          {savings.map((saving) => (
            <div
              key={saving._id}
              className="bg-pa_one text-white  p-3 rounded-lg shadow-md"
            >
              <p className="text font-semibold">savingId: {saving._id}</p>
              <button className="mt-4 bg-pa_three text-pa_one font-bold py-2 px-4 rounded">
                <Link href={`/savings/${saving._id}`}>Explore</Link>
              </button>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-pa_two p-6 rounded-lg shadow-lg relative">
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
            <input
              type="text"
              value={fundAmount}
              onChange={(e) => setFundAmount(Number(e.target.value))}
              className="border border-gray-400 p-2 rounded mb-4 w-full"
              placeholder="Enter amount"
            />
            <div className="flex justify-end">
              <button
                className="mt-4 bg-pa_one text-pa_two py-2 px-4 rounded flex items-center"
                onClick={handleFundAmountInSaving}
              >
                Create saving
              </button>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        isOpen={showSuccessSnackbar}
        message="You have successfully funded your saving. App is now creating your saving."
        onClose={() => setShowSuccessSnackbar(false)}
      />
    </div>
  );
};

export default SavingsPage;
