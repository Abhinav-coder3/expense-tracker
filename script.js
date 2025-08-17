document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
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
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
        `;
      expenseList.appendChild(li);
    });
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function saveExpensesTolocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);

      saveExpensesTolocal();
      renderExpenses();
      updateTotal();
    }
  });
});

//CONSOLE LOGGED VERSION FOR BETTER UNDERSTANDING

// expenseForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("🚀 Form submitted");

//   const name = expenseNameInput.value.trim();
//   const amount = parseFloat(expenseAmountInput.value.trim());

//   console.log("Entered name:", name);
//   console.log("Entered amount:", amount);

//   if (name !== "" && !isNaN(amount) && amount > 0) {
//     const newExpense = {
//       id: Date.now(),
//       name: name,
//       amount: amount,
//     };
//     console.log("✅ New expense object created:", newExpense);

//     expenses.push(newExpense);
//     console.log("Expenses after adding new one:", expenses);

//     saveExpensesTolocal();
//     renderExpenses();
//     updateTotal();

//     // Clear input
//     expenseNameInput.value = "";
//     expenseAmountInput.value = "";
//     console.log("Input fields cleared");
//   } else {
//     console.log("❌ Invalid input: Either name is empty or amount is not valid");
//   }
// });

// function renderExpenses() {
//   console.log("🔄 Rendering expenses...");
//   expenseList.innerHTML = "";

//   expenses.forEach((expense) => {
//     console.log("Rendering expense:", expense);
//     const li = document.createElement("li");
//     li.innerHTML = `
//       ${expense.name} - $${expense.amount}
//       <button data-id="${expense.id}">Delete</button>
//     `;
//     expenseList.appendChild(li);
//   });

//   console.log("✅ Finished rendering. Total items:", expenses.length);
// }

// function calculateTotal() {
//   const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   console.log("📊 Calculating total:", total);
//   return total;
// }

// function saveExpensesTolocal() {
//   console.log("💾 Saving to localStorage:", expenses);
//   localStorage.setItem("expenses", JSON.stringify(expenses));
// }

// function updateTotal() {
//   totalAmount = calculateTotal();
//   totalAmountDisplay.textContent = totalAmount.toFixed(2);
//   console.log("✅ Total updated on UI:", totalAmount.toFixed(2));


// expenseList.addEventListener("click", (e) => {
//   console.log("Clicked element:", e.target); // shows what you clicked

//   if (e.target.tagName === "BUTTON") {
//     console.log("✅ A delete button was clicked!");

//     // Get expense id from button
//     const expenseId = parseInt(e.target.getAttribute("data-id"));
//     console.log("Expense ID to delete:", expenseId);

//     // Before deletion
//     console.log("Expenses before delete:", expenses);

//     // Remove from array
//     expenses = expenses.filter((expense) => expense.id !== expenseId);

//     // After deletion
//     console.log("Expenses after delete:", expenses);

//     // Save updated expenses to localStorage
//     saveExpensesTolocal();
//     console.log("Expenses saved to localStorage");

//     // Re-render UI
//     renderExpenses();
//     console.log("UI re-rendered with updated expenses");

//     // Update total amount
//     updateTotal();
//     console.log("Total updated:", totalAmount);
//   } else {
//     console.log("Clicked inside expense list, but not on a delete button.");
//   }
// });
