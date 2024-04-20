import { getContributor } from "@/services/getContributor";
import { getContributionsOfContributor } from "@/services/getContributionsOfContributor";
import { Contributor } from "@/utils/types/contributor";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { addContributorToDirectory } from "@/services/addContributorToDirectory";
import { approvePamojaAppContractToWithdrawFunds } from "@/services/approvePamojaAppContractToWithdrawFunds";
import { getAmountApprovedForPamojaContract } from "@/services/getAmountApprovedForPamojaContract";
import { Contribution } from "@/utils/types/contributions";
import Snackbar from "@/components/snackbar";
import Spinner from "@/components/spinner";
import Link from "next/link";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(250);
  const [contributor, setContributor] = useState<Contributor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [approvalSuccess, setApprovalSuccess] = useState(false); // State to track approval success
  const [amountApproved, setAmountApproved] = useState<number | null>(null); // State to store the amount approved

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetchContributor();
    fetchContributions();
    fetchContributionAmounts();
    fetchAmountApproved();
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  const fetchContributor = async () => {
    const contributorData = await getContributor(address, address as string);
    setContributor(contributorData);
  };

  const fetchContributions = async () => {
    const contributions = await getContributionsOfContributor(address);
    setContributions(contributions);
  };

  const fetchContributionAmounts = async () => {
    const contributions = await getContributionsOfContributor(address);
    const totalSavedAmount = contributions.reduce(
      (accumulator, contribution) => accumulator + contribution._amount,
      0
    );
    setTotalSaved(totalSavedAmount);
  };

  const fetchAmountApproved = async () => {
    const amount = await getAmountApprovedForPamojaContract(address);
    setAmountApproved(amount);
  };

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
      setSnackbarMessage("Username created successfully!");
      setShowSnackbar(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsername("");
    setShowUsernameError(false);
  };

  if (!isMounted) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const handleApproveModalSubmit = async () => {
    setIsSubmitting(true);
    const success = await approvePamojaAppContractToWithdrawFunds(address, {
      _amount: amount,
    });
    setIsSubmitting(false);
    if (success) {
      setApprovalSuccess(true);
      setShowApproveModal(false);
      setSnackbarMessage("Approval successful!");
      setShowSnackbar(true);
    } else {
      setSnackbarMessage("Approval failed. Please try again.");
      setShowSnackbar(true);
    }
  };

  const closeNotificationModal = () => {
    setShowSnackbar(false);
    setSnackbarMessage("");
    window.location.reload();
  };

  return (
    <div className="container mx-auto bg-pa_two flex flex-col justify-start items-center min-h-screen w-5/6">
      <h2 className="text-3xl font-bold mt-6 mb-2">
        Welcome{contributor && `, ${contributor._username}`}!
      </h2>
      <p className="mb-4">
        Together, you and others can pool money and save for greater causes.
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
      <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full mb-4">
        {/* Card 1 */}
        <h2 className="text-lg font-semibold">Current Total Savings:</h2>
        <p>{totalSaved} cUSD</p>
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
        {contributor !== null &&
          amountApproved === 0 &&
          amountApproved !== null &&
          !approvalSuccess && (
            <button
              className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
              onClick={() => setShowApproveModal(true)}
            >
              Approve Pamoja App
            </button>
          )}

        {contributor !== null &&
          amountApproved! !== 0 &&
          amountApproved !== null &&
          !approvalSuccess && (
            <Link
              href="/savings"
              className="bg-pa_three text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
            >
              Go to savings
            </Link>
          )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-pa_two p-6 rounded-lg shadow-lg relative">
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
              <p className="text-red-500 mb-4">No username given.</p>
            )}
            <div className="flex justify-end">
              <button
                className="mt-4 bg-pa_one text-pa_two font-bold py-2 px-4 rounded flex items-center"
                onClick={handleModalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pa_two"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showApproveModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-pa_three p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowApproveModal(false)}
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
            <h2 className="text-xl font-bold mb-4 pt-4">Approve Pamoja App</h2>

            <h2 className="font-normal mb-4 pt-1">
              Enter saving target here.{" "}
            </h2>
            <h2 className="font-bold mb-4 pt-1">Please note: </h2>

            <h2 className="font-normal italic">
              - This is merely an approval.{" "}
            </h2>
            <h2 className="font-normal italic">
              - You can increase your target later.{" "}
            </h2>

            <h2 className="font-normal italic mb-4 pb-4">
              - No amount will be withdrawn.{" "}
            </h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="border border-gray-400 p-2 rounded mb-4 pt-2"
              placeholder="Enter amount"
            />
            <div className="flex justify-end">
              <button
                className="mt-4 bg-pa_one text-pa_two font-bold py-2 px-4 rounded flex items-center"
                onClick={handleApproveModalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pa_two"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        isOpen={showSnackbar}
        message={snackbarMessage}
        onClose={closeNotificationModal}
      />
    </div>
  );
}
