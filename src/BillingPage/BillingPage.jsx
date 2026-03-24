import React, { useState } from 'react'
import BillingSummary from './BillingSummary';
import InvoiceList from './InvoiceList';
import PaymentForm from './PaymentForm';

const BillingPage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    { id: 1, amount: 120, status: "Due" },
    { id: 2, amount: 80, status: "Paid" },
    { id: 3, amount: 150, status: "Due" },
  ]

  return (
    <div style={{ padding: "20px" }}>
      <h2>Billing & Payment</h2>

      <BillingSummary invoices={invoices} />

      <InvoiceList
        invoices={invoices}
        onSelect={setSelectedInvoice}
      />

      {selectedInvoice && (
        <PaymentForm  invoice={selectedInvoice}/>
      )}

    </div>
  )
};

export default BillingPage;