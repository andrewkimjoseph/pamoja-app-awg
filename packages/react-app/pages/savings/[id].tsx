import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { withdrawToRecipientContributor } from '@/services/_withdrawToRecipientContributor'; // Adjust the import path accordingly
import { useAccount } from 'wagmi';

const SavingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { address, isConnected } = useAccount();

  const handleWithdrawal = async () => {
    // Call the withdrawToRecipientContributor function
    const success = await withdrawToRecipientContributor(
      address,
      { _savingId: Number(id) } // Pass the saving ID
    );

    if (success) {
      // Handle success
      console.log('Withdrawal successful');
    } else {
      // Handle failure
      console.log('Withdrawal failed');
    }
  };

  useEffect(() => {
    console.log('Router Query:', router.query);
  }, [router.query]);

  return (
    <div className="flex flex-col items-start  h-screen px-2">
      <h1 className="text-2xl font-bold text-bg_one">Interacting with Saving: {id}</h1>
      <button 
        className="mt-4 bg-pa_three text-pa_one font-bold py-2 px-4 rounded" 
        onClick={handleWithdrawal} // Call handleWithdrawal function on button click
      >
        Close round
      </button>
    </div>
  );
};

export default SavingPage;
