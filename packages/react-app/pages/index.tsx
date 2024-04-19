import { getContributor } from "@/services/getContributor";
import { getContributionsOfContributor } from "@/services/getContributionsOfContributor";
import { Contributor } from "@/utils/types/contributor";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { addContributorToDirectory } from "@/services/addContributorToDirectory";
import { approvePamojaAppContractToWithdrawFunds } from "@/services/approvePamojaAppContractToWithdrawFunds";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [username, setUsername] = useState("");
  const [approvalAmount, setApprovalAmount] = useState("");
  const [contributor, setContributor] = useState<Contributor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [approvalSuccess, setApprovalSuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchContributor();
    fetchContributions();
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  const handleApprovalModalOpen = () => {
    setShowApprovalModal(true);
  };

  const handleApprovalModalClose = () => {
    setShowApprovalModal(false);
    setApprovalAmount("");
    setApprovalSuccess(false);
  };

  const handleApprovalAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApprovalAmount(event.target.value);
  };
  const fetchContributor = async () => {
    const contributorData = await getContributor(address);
    setContributor(contributorData);
  };

  const fetchContributions = async () => {
    const contributions = await getContributionsOfContributor(address);
    const totalSavedAmount = contributions.reduce(
      (accumulator, contribution) => accumulator + contribution._amount,
      0
    );
    setTotalSaved(totalSavedAmount);
  };

  if (!isMounted) {
    return null;
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setShowUsernameError(false);
  };

  const handleModalSubmit = async () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername === "") {
      setShowUsernameError(true);
    } else {
      setIsSubmitting(true);
      await addContributorToDirectory(address, {
        _username: trimmedUsername,
        _contributorAddress: address,
      });
      await fetchContributor();
      setShowModal(false);
      setUsername("");
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsername("");
    setShowUsernameError(false);
  };

  const handleApprovalSubmit = async () => {
    const approvalResult = await approvePamojaAppContractToWithdrawFunds(
      address,
      { _amount: parseInt(approvalAmount) }
    );
    setApprovalSuccess(approvalResult);
    setApprovalAmount("");
  };

  return (
    <div className="container mx-auto bg-pa_two flex flex-col justify-start items-center w-5/6">
      <h2 className="text-3xl font-bold mt-6 mb-2">
        Welcome{contributor && `, ${contributor._username}`}!
      </h2>
      <p className="mb-4">
        Together, you and other can pool money and save for greater causes.
      </p>
      {isConnected ? (
        <div className="bg-pa_one text-white p-4 rounded-lg shadow-md w-full mb-4">
          <p>Status: Connected</p>
          {/* <p>Amount: {contribution._amount}</p> */}
        </div>
      ) : (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full mb-4">
          <p>No Wallet Connected</p>
        </div>
      )}
      <div className="bg-pa_three p-4 rounded-lg shadow-md w-full mb-4">
        {/* Card 1 */}
        <h2 className="text-lg font-semibold">Total Saved</h2>
        <p>Total Saved: {totalSaved} cUSD</p>
      </div>

      <div className="p-6">
        {contributor === null && (
          <button
            className="bg-pa_one text-pa_two font-bold py-2 px-4 rounded mb-4 border border-pa_one"
            onClick={() => setShowModal(true)}
          >
            Get started
          </button>
        )}
        {username && <p>Username: {username}</p>}

        {contributor !== null && (
          <button
            className="bg-pa_one text-pa_two font-bold py-2 px-4 rounded mb-4 border border-pa_one"
            onClick={handleApprovalModalOpen}
          >
            Approve amount
          </button>
        )}
        {username && <p>Username: {username}</p>}
      </div>

      {/* ... (Modal code remains the same) */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg shadow-lg relative bg-pa_two">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
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
            <h2 className="text-xl font-bold mb-4">Enter Username</h2>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="border border-gray-400 p-2 rounded mb-4"
              placeholder="Enter your username"
            />
            {showUsernameError && (
              <p className="text-red-500 mb-4">
                Please enter a valid username.
              </p>
            )}
            <div className="flex justify-end">
              <button
                className="mt-4 bg-pa_one text-pa_two py-2 px-4 rounded flex items-center"
                onClick={handleModalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pa_three"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showApprovalModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg shadow-lg relative bg-pa_two">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 pb-4"
              onClick={handleApprovalModalClose}
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
            <h2 className="text-xl font-bold mb-4 pt-4">Enter Amount to Approve</h2>
            <input
              type="number"
              value={approvalAmount}
              onChange={handleApprovalAmountChange}
              className="border border-gray-400 p-2 rounded mb-4"
              placeholder="Enter amount"
            />
            {approvalSuccess && (
              <p className="text-green-500 mb-4">Approval successful!</p>
            )}
            <div className="flex justify-end">
              <button
                className="mt-4 bg-pa_one text-pa_two py-2 px-4 rounded flex items-center"
                onClick={handleApprovalSubmit}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
