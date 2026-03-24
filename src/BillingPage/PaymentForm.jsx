import React, { useState } from "react"

const PaymentForm = ({ invoice }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const handlePayment = (e) => {
    e.preventDefault();

    if (cardNumber.length < 16) {
      setError("Invalid Card Number")
      return;
    }
    setError("");

    setTimeout(() => {
      setSuccess(true)
    }, 1000);
  }

  if(success){
    return <h4>Payment was Successful for Invoice #{invoice.id}</h4>
  }

  return (
    <form onSubmit={handlePayment}>
      <h3>Pay Invoice #{invoice.id}</h3>
      <p>Amount : ${invoice.amount}</p>
      <input type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />

      {error && <p style={{color: "red"}}>{error}</p>}

      <button type="submit">Pay</button>

    </form>
  )
};

export default PaymentForm;