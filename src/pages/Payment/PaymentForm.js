import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery"; // Import jQuery for interactive elements
import "./Style.css";
import userContext from "../../context/userContext";
import { SelectedCardContext } from "../../context/pricingContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const PaymentForm = () => {
  const navigate = useNavigate();
  const userDetails = useContext(userContext); // Fetch user details
  const { selectedCardId } = useContext(SelectedCardContext); // Fetch selected card ID

  const [price, setPrice] = useState("");
  const [cardParts, setCardParts] = useState(["", "", "", ""]);
  const [cardHolder, setCardHolder] = useState("");
  const [cardCCV, setCardCCV] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handleClick = () => {
    navigate("/success");
  };

  useEffect(() => {
    // Get the price from URL params
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    const priceParam = queryParams.get("price");
    if (priceParam) {
      setPrice(priceParam);
    }
  }, []);

  const handleCardNumberChange = (index, value) => {
    const updatedCardParts = [...cardParts];
    updatedCardParts[index] = value; // Update the correct segment of the card number
    setCardParts(updatedCardParts);
  };

  const getCompleteCardNumber = () => {
    return cardParts.join(" "); // Combine the four parts to create the complete card number
  };

  useEffect(() => {
    // jQuery code to handle interactive elements
    $(".input-cart-number").on("keyup change", function () {
      const $t = $(this); // Use var to declare $t as a local variable

      if ($t.val().length > 3) {
        $t.next().focus();
      }

      let card_number = "";
      $(".input-cart-number").each(function () {
        card_number += $(this).val() + " ";
        if ($(this).val().length === 4) {
          $(this).next().focus();
        }
      });

      $(".credit-card-box .number").html(card_number);
    });

    $("#card-holder").on("keyup change", function () {
      const $t = $(this); // Use var to declare $t as a local variable
      $(".credit-card-box .card-holder div").html($t.val());
    });

    $("#card-ccv")
      .on("focus", function () {
        $(".credit-card-box").addClass("hover");
      })
      .on("blur", function () {
        $(".credit-card-box").removeClass("hover");
      })
      .on("keyup change", function () {
        $(".ccv div").html($(this).val());
      });
  }, []);

  const validateForm = () => {
    let valid = true;
    let errorMessage = "";

    // Check if all card parts have 4 digits
    if (cardParts.some((part) => part.length !== 4)) {
      errorMessage = "Each part of the card number must have 4 digits.";
      valid = false;
    }

    // Check if the card holder name is provided
    if (cardHolder.trim() === "") {
      errorMessage = "Card holder name must be provided.";
      valid = false;
    }

    // Check if CCV has 3 digits
    if (cardCCV.length !== 3) {
      errorMessage = "CCV must have 3 digits.";
      valid = false;
    }

    // Check if expiration month and year are selected
    if (!expirationMonth || !expirationYear) {
      errorMessage = "Expiration date must be provided.";
      valid = false;
    }

    

    if (!valid) {
      toast.warn(errorMessage); // Show error message
    }

    return valid; // Return validation result
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    if (!validateForm()) {
      return; // Prevent form submission if invalid
    }

    const cardNumber = getCompleteCardNumber();
    const userId = userDetails?.userDetails?.userId;
    const paymentAmount = parseFloat(price);

    // Create the payment data object
    const paymentData = {
      userId,
      cardId: selectedCardId,
      paymentAmount,
      cardHolder,
      cardNumber,
      cardCCV,
      paymentMethod,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/price/recordPayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (response.ok) {
        navigate("/success"); // Redirect to success page
      toast.success("Payment Successful"); // Show error message


      } else {
        console.error("Payment submission failed");
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission", error);
      alert("An error occurred during payment submission.");
    }
  };

  return (
    <div className="checkout">
      <h1 className="font-bold">Price: {price}</h1>
      <div className="credit-card-box">
        <div className="flip">
          <div className="front">
            <div className="chip"></div>
            <div className="logo">
              <svg
                version="1.1"
                id="visa"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="47.834px"
                height="47.834px"
                viewBox="0 0 47.834 47.834"
                style={{ enableBackground: "new 0 0 47.834 47.834" }}
              >
                <g>
                  <g>
                    <path
                      d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                               c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                               c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                               M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                               c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                               c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                               l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                               C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                               C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                               c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                               h-3.888L19.153,16.8z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="number"></div>
            <div className="card-holder">
              <label>Card holder</label>
              <div></div>
            </div>
            <div className="card-expiration-date">
              <label>Expires</label>
              <div></div>
            </div>
          </div>
          <div className="back">
            <div className="strip"></div>
            <div className="logo">
              <svg
                version="1.1"
                id="visa"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="47.834px"
                height="47.834px"
                viewBox="0 0 47.834 47.834"
                style={{ enableBackground: "new 0 0 47.834 47.834" }}
              >
                <g>
                  <g>
                    <path
                      d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                               c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                               c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                               M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                               c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                               c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                               l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                               C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                               C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                               c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                               h-3.888L19.153,16.8z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="ccv">
              <label>CCV</label>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <form
        className="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset>
          <label htmlFor="card-number">Card Number</label>
          {cardParts.map((part, index) => (
            <input
              key={index}
              type="text"
              className="input-cart-number"
              maxLength="4"
              value={part}
              onChange={(e) => handleCardNumberChange(index, e.target.value)}
            />
          ))}
        </fieldset>
        <fieldset>
          <label htmlFor="card-holder">Card holder</label>
          <input
            type="text"
            id="card-holder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset-expiration">
          <label htmlFor="card-expiration-month">Expiration date</label>
          <div className="select">
            <select
              id="card-expiration-month"
              value={expirationMonth}
              onChange={(e) => setExpirationMonth(e.target.value)}
            >
              <option></option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </div>
          <div className="select">
            <select
              id="card-expiration-year"
              value={expirationYear}
              onChange={(e) => setExpirationYear(e.target.value)}
            >
              <option></option>
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
        </fieldset>
        <fieldset className="fieldset-ccv">
          <label htmlFor="card-ccv">CCV</label>
          <input
            type="text"
            id="card-ccv"
            maxLength="3"
            value={cardCCV}
            onChange={(e) => setCardCCV(e.target.value)}
          />
        </fieldset>
        <button type="submit" className="btn">
          <i className="fa fa-lock"></i> submit
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
