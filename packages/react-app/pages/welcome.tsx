import { getContributionsOfContributor } from "@/services/getContributionsOfContributor";
import { Contribution } from "@/utils/types/contributions";
import { useEffect, useState } from "react";
import React from "react";
import Spinner from "../components/spinner";
import { useAccount } from "wagmi";

const WelcomePage: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { address } = useAccount();


  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const fetchedContributions = await getContributionsOfContributor(address);
        setContributions(fetchedContributions);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (isLoading) {
    return <Spinner />; // Render loading page while fetching contributions
  }

  return (
    <div className="container mx-auto p-6 bg-pa_three">
      <h1 className="relative text-4xl text-pa_one font-bold text-center mt-10">
        Welcome to Our Website!
      </h1>
      <p className="text-lg text-center mt-6">
        Thank you for visiting. We hope you enjoy your stay.
      </p>

      

      <div className="flex flex-col items-center">
        {contributions.map((contribution) => (
          <div
            key={contribution._index}
            className="bg-pa_one text-white m-2 p-4 rounded-lg shadow-md w-full"
          >
            <p>Index: {contribution._index}</p>
            <p>Amount: {contribution._amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;