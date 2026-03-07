

function BankForm({
  formData,
  setFormData,
  transactions,
  setTransactions
}) {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { date: "", description: "", debit: "", credit: "" }
    ]);
  };

  const updateTxn = (i, field, value) => {

    const updated = [...transactions];

    updated[i][field] = value;

    setTransactions(updated);
  };

  return (
    <div>

      <h2>Bank Details</h2>

      <label>Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label>Account Number</label>
      <input
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleChange}
      />

      <label>Opening Balance</label>
      <input
        name="balance"
        value={formData.balance}
        onChange={handleChange}
      />

      <hr />

      <h3>Transactions</h3>

      {transactions.map((txn, i) => (

        <div key={i} style={{ marginBottom: 10 }}>

          <input
            placeholder="Date"
            value={txn.date}
            onChange={(e) =>
              updateTxn(i, "date", e.target.value)
            }
          />

          <input
            placeholder="Description"
            value={txn.description}
            onChange={(e) =>
              updateTxn(i, "description", e.target.value)
            }
          />

          <input
            placeholder="Debit"
            value={txn.debit}
            onChange={(e) =>
              updateTxn(i, "debit", e.target.value)
            }
          />

          <input
            placeholder="Credit"
            value={txn.credit}
            onChange={(e) =>
              updateTxn(i, "credit", e.target.value)
            }
          />

        </div>

      ))}

      <button onClick={addTransaction}>
        Add Transaction
      </button>
</div>
  );
}

export default BankForm;