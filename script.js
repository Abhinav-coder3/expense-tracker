document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");




  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();


  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0 ){
        const newExpense ={
            id:Date.new(),
            name: name,
            amount: amount,
        };
       expenses.push(newExpense);
        saveExpensesTolocal();
        renderExpenses();
        updateTotal();

        //clear input
        expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  })

  function  saveExpensesTolocal() {
    localStorage.setItem("expenses",JSON.stringify(expenses));
  }
});
