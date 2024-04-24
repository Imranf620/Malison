import React, { useState, useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { SelectedCardContext } from "../../context/pricingContext";

const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
  isAdmin,
  onDelete,
  createdByUsername, // Add createdByUsername as a prop,
  id,
}) => {
  const { selectedCardId, handleCardClick } = useContext(SelectedCardContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // Call handleCardClick function from context and pass the id
    handleCardClick(id);
    setIsClicked(true);
    // Redirect or handle click action
    window.location.href = `/payment?price=${price}`;
    console.log("Selected Card ID:", selectedCardId); // Log selected card ID
  };

  const handleDelete = () => {
    onDelete(); // Call the onDelete function passed from the parent component
  };

  useEffect(() => {
    // Log selected card ID after the first click
    if (isClicked) {
      console.log("Selected Card ID:", selectedCardId);
    }
  }, [selectedCardId, isClicked]);

  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3 ]">
        <div className="relative z-10  overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8  shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10  xl:p-[50px]">
          <span className=" block text-lg font-semibold text-primary">
            {type}
          </span>
          <h2 className="mb-1 text-[30px] font-bold text-dark dark:text-white">
            {price}
            <div>
              <span className="text-base font-medium text-body-color dark:text-dark-6">
                {subscription}
              </span>
            </div>
          </h2>
          <p className="mb-8 pr-8 border-b border-stroke pb-1 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
            {description}
          </p>
          <div className="mb-4 flex flex-col gap-[14px]">{children}</div>
          <button
            className={` ${
              active
                ? "block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-inherit transition hover:bg-opacity-90"
                : "block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3"
            } `}
            onClick={handleClick}
          >
            {buttonText}
          </button>
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="block w-full mt-4 rounded-md border border-red-500 bg-red-500 text-white py-2 px-3 font-medium text-center transition hover:bg-red-600"
            >
              Delete
            </button>
          )}
          <div>
            <span className="absolute right-0 top-7 z-[-1]">
              <svg
                width={77}
                height={172}
                viewBox="0 0 77 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1={86}
                    y1={0}
                    x2={86}
                    y2={172}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3056D3" stopOpacity="0.09" />
                    <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute right-4 top-4 z-[-1]">
              <svg
                width={41}
                height={89}
                viewBox="0 0 41 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG circles */}
              </svg>
            </span>
          </div>
          <p>Created by: {createdByUsername}</p>{" "}
          {/* Display the createdByUsername */}
        </div>
      </div>
    </>
  );
};

const PricingCards = () => {
  const [pricingPlans, setPricingPlans] = useState([]);

  const userDetails = useContext(userContext);

  const [isAdmin, setIsAdmin] = useState(userDetails.userDetails.isAdmin);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/price/getCard");
        if (!response.ok) {
          throw new Error("Failed to fetch pricing plans");
        }
        const data = await response.json();
        setPricingPlans(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      }
    };

    fetchPricingPlans();
  }, []);

  // Function to delete a pricing plan
  const deletePricingPlan = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8800/api/price/deleteCard/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete pricing plan");
      }
      // Remove the deleted plan from the state
      setPricingPlans(pricingPlans.filter((plan) => plan._id !== id));
      // console.log("Pricing plan deleted successfully");
    } catch (error) {
      console.error("Error deleting pricing plan:", error);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden bg-white pb-1 dark:bg-dark lg:pb-[1px] lg:pt-[1px] h-min min-h-[100vh]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[30px] max-w-[510px] text-center">
              <h2 className="   text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Our Pricing Plan
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              type={plan.packageName}
              price={plan.price}
              subscription={plan.subscription}
              description={plan.description}
              buttonText="Choose"
              active={index === 0} // You can set the first plan to be active
              isAdmin={isAdmin}
              onDelete={() => deletePricingPlan(plan._id)}
              createdByUsername={plan.createdByUsername} // Pass the createdByUsername
              id={plan._id}
            >
              {/* Render your list items here */}
              {plan.features.map((feature, idx) => (
                <>
                  <List key={idx}>{feature}</List>
                </>
              ))}
            </PricingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const List = ({ children }) => {
  return (
    <p className="text-base text-body-color dark:text-dark-6">{children}</p>
  );
};

export default PricingCards;
