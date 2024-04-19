// import { getContributor } from "@/services/getContributor";
// import { getContributionsOfContributor } from "@/services/getContributionsOfContributor";
// import { Contributor } from "@/utils/types/contributor";
// import { useEffect, useState } from "react";
// import { useAccount } from "wagmi";

// export default function Home() {
//   const [userAddress, setUserAddress] = useState("");
//   const [isMounted, setIsMounted] = useState(false);
//   const { address, isConnected } = useAccount();
//   const [showModal, setShowModal] = useState(false);
//   const [username, setUsername] = useState("");
//   const [contributor, setContributor] = useState<Contributor | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showUsernameError, setShowUsernameError] = useState(false);
//   const [totalSaved, setTotalSaved] = useState<number>(0);

//   useEffect(() => {
//     setIsMounted(true);
//     fetchContributor();
//     fetchContributions();
//   }, []);

//   useEffect(() => {
//     if (isConnected && address) {
//       setUserAddress(address);
//     }
//   }, [address, isConnected]);

//   const fetchContributor = async () => {
//     const contributorData = await getContributor(address);
//     setContributor(contributorData);
//   };

//   const fetchContributions = async () => {
//     const contributions = await getContributionsOfContributor(address);
//     const totalSavedAmount = contributions.reduce(
//       (accumulator, contribution) => accumulator + contribution._amount,
//       0
//     );
//     setTotalSaved(totalSavedAmount);
//   };

//   if (!isMounted) {
//     return null;
//   }

//   const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//     setShowUsernameError(false);
//   };

//   const handleModalSubmit = async () => {
//     const trimmedUsername = username.trim();
//     if (trimmedUsername === "") {
//       setShowUsernameError(true);
//     } else {
//       setIsSubmitting(true);
//       await addContributorToDirectory(address, trimmedUsername);
//       await fetchContributor();
//       setShowModal(false);
//       setUsername("");
//       setIsSubmitting(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setUsername("");
//     setShowUsernameError(false);
//   };

//   return (
//     <div className="container mx-auto bg-pa_three flex flex-col justify-start items-center min-h-screen">
//       <h2 className="text-3xl font-bold mt-6 mb-2">
//         Welcome{contributor && `, ${contributor._username}`}!
//       </h2>
//       <p className="mb-4">
//         Pamoja: Together, you and other can pool money and save for greater
//         causes.
//       </p>
//       {isConnected ? (
//         <div className="bg-pa_one text-white p-4 rounded-lg shadow-md w-full mb-4">
//           <p>Status: Connected</p>
//           {/* <p>Amount: {contribution._amount}</p> */}
//         </div>
//       ) : (
//         <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full mb-4">
//           <p>No Wallet Connected</p>
//         </div>
//       )}
//       <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full mb-4">
//         {/* Card 1 */}
//         <h2 className="text-lg font-semibold">Total Saved</h2>
//         <p>Total Saved: {totalSaved} cUSD</p>
//       </div>
//       <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full">
//         {/* Card 2 */}
//         <h2 className="text-lg font-semibold">Total Received</h2>
//         <p>...</p>
//       </div>
//       <div className="p-6">
//         {contributor === null && (
//           <button
//             className="bg-pa_two text-first font-bold py-2 px-4 rounded mb-4 border border-pa_one"
//             onClick={() => setShowModal(true)}
//           >
//             Get started
//           </button>
//         )}
//         {username && <p>Username: {username}</p>}
//       </div>

//       {/* ... (Modal code remains the same) */}
//     </div>
//   );
// }