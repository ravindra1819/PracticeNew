export default function BillingSummary({invoices}){

const totalDue = invoices
              .filter(i => i.status === "Due")
              .reduce((sum,i) => sum + i.amount, 0);
  return(
    <div>
      <h3>TotalDues : ${totalDue}</h3>
    </div>
  )
}