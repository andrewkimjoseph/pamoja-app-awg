// import React, { useState } from 'react';
// import Link from 'next/link';
// import Snackbar from '../components/Snackbar';

// export type Saving = {
//   _id: number;
//   _creatingContributor: `0x${string}` | undefined;
// };

// const SavingsPage = () => {
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [fundAmount, setFundAmount] = useState('');
//   const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
//   const [savings, setSavings] = useState<Saving[]>([]);

//   const handleCreateSaving = () => {
//     setShowCreateModal(true);
//   };

//   const handleFundAmountInSaving = async () => {
//     const success = await _fundAmountInSaving(fundAmount);
//     if (success) {
//       setShowCreateModal(false);
//       setShowSuccessSnackbar(true);
//       // Fetch the updated savings list
//       const contributorAddress = '0x...'; // Replace with the actual contributor address
//       const updatedSavings = await getSavingsOfContributor(contributorAddress);
//       setSavings(updatedSavings);
//     }
//   };

//   const getSavingCardColor = (saving: Saving) => {
//     const contributorAddress = '0x...'; // Replace with the actual contributor address
//     const isCreatingContributor = checkIfContributorIsCreatingContributor(
//       contributorAddress,
//       saving._creatingContributor
//     );
//     return isCreatingContributor ? 'bg-pa_one' : 'bg-pa_two';
//   };

//   return (
//     <div>
//       <h1>Savings</h1>
//       <button onClick={handleCreateSaving}>Create a saving</button>

//       <h2>Your Savings</h2>
//       {savings.map((saving, index) => (
//         <div key={index} className={getSavingCardColor(saving)}>
//           <p>savingId: {saving._id}</p>
//           <p>
//             Current holdings:{' '}
//             {getContributionsOfSaving(saving._id).reduce(
//               (total, amount) => total + amount,
//               0
//             )}
//           </p>
//           <p>Amount per person: {getContributionsOfSaving(saving._id)[0]}</p>
//           <button>
//             <Link href={`/savings/${saving._id}`}>Interact</Link>
//           </button>
//         </div>
//       ))}

//       {showCreateModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 border border-pa_one">
//           <div className="bg-pa_two p-6 rounded-lg shadow-lg relative border border-pa_three">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               onClick={() => setShowCreateModal(false)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <h2 className="text-xl font-bold mb-4">Create a saving</h2>
//             <input
//               type="text"
//               value={fundAmount}
//               onChange={(e) => setFundAmount(e.target.value)}
//               className="border border-gray-400 p-2 rounded mb-4"
//               placeholder="Enter amount"
//             />
//             <div className="flex justify-end">
//               <button
//                 className="mt-4 bg-pa_one text-pa_two py-2 px-4 rounded flex items-center"
//                 onClick={handleFundAmountInSaving}
//               >
//                 Create saving
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Snackbar
//         isOpen={showSuccessSnackbar}
//         message="You have successfully funded your saving. App is now creating your saving."
//         onClose={() => setShowSuccessSnackbar(false)}
//       />
//     </div>
//   );
// };

// export default SavingsPage;