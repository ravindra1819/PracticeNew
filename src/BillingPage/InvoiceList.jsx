const InvoiceList = ({ invoices , onSelect }) => {
  return(
    <div>
      <h3>Invoices</h3>
      <ul>
        {invoices.map((inv) => (
          <li key={inv.id}>
            Invoice #{inv.id} - ${inv.amount} - {inv.status}
            {inv.status === "Due" && (
              <button onClick={() => onSelect(inv)}>
                 <strong>PayNow</strong>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default InvoiceList;