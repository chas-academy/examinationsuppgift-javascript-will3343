/** Chas Academy Fullstack JS 
 * Author: William Berhane 
 * Date: 2026-05-19
 */


   /*
      This script runs after the HTML DOM is fully loaded.
      It connects the page elements to the budget logic,
      validates user input, creates transaction list entries,
      and keeps the running balance up to date.
    */

window.addEventListener("DOMContentLoaded", () => {
   

    // HTML - elements we used in the application. 
    // We check for their existence before using them.

    const descInput = document.querySelector("#desc");
    const amountInput = document.querySelector("#amount");
    const incomeList = document.querySelector("#incomeList");
    const expenseList = document.querySelector("#expenseList");
    const balanceElement = document.querySelector("#balance");

    // / Internal variable called balance and  functionally to updated with every transaction.

    let balance = 0;

    // A Function called updateB that updates the balance in the DOM.

    const updateB = () => {
        if (!balanceElement) return;      // if condition,  If the element is missing, delete.
        balanceElement.textContent = balance;
    };

    // A function called clearInputs, Function that clears input fields after a transaction has been added.

    const clearInputs = () => {
        if (descInput) descInput.value = "";
        if (amountInput) amountInput.value = "";
    };

    // A function called addTransaction, Function that handles both income and expense transactions based on the type parameter. 
    // It validates input, updates the balance, and adds entries to the respective lists.
    
    const addTransaction = (type) => {
        
        if (!descInput || !amountInput || !balanceElement) return;    // Ensure that necessary elements are present.

        // Read and Trim input values to remove extra whitespace and validate them.

        const description = descInput.value.trim();
        const amountRaw = amountInput.value.trim();
        const amountValue = parseFloat(amountRaw);

        // Validate that both description and amount are provided before proceeding. 
        // If either is missing, we exit the function early.

        if (!description || !amountRaw) {
            return;
        }

        // Validate that the amount is a valid number. 
        // If it's not, we exit the function early to prevent invalid transactions from being processed.
        
        if (Number.isNaN(amountValue)) {
            return;
        }

        // Determine if the transaction is an income or an expense based on the type parameter.
        
        const isIncome = type === "income";
        const list = isIncome ? incomeList : expenseList;
        const tag = isIncome ? "Inkomst" : "Utgift";
        const amount = amountValue;

        // Check if the target list element exists before trying to add a new item.

        if (!list) return;

        // Create a new list item for the transaction and append it to the 
        // appropriate list (income or expense) in the DOM.

        const item = document.createElement("li");
        item.textContent = `${description} - ${amount} kr (${tag})`;
        list.appendChild(item);

        // Update the balance by adding the amount for income or subtracting 
        // it for expenses, then call updateB to refresh the displayed balance.

        balance += isIncome ? amount : -amount;
        updateB();

        // Clear the input fields after processing the transaction to prepare for the next entry.

        clearInputs();
    };

    // Select the buttons for adding income and expenses, using multiple selectors 
    // to ensure compatibility with different HTML structures.

    const addIncomeButton = document.querySelector("#incomeBtn") || document.querySelector("button[data-type='income']") || document.querySelector(".add-income");
    const addExpenseButton = document.querySelector("#expenseBtn") || document.querySelector("button[data-type='expense']") || document.querySelector(".add-expense");

    // Connect the income button to the addTransaction function with the correct type parameter.

    if (addIncomeButton) {
        addIncomeButton.addEventListener("click", (event) => {
            event.preventDefault();
            addTransaction("income");
        });
    }

    // Connect the expense button to the addTransaction function with the correct type parameter.

    if (addExpenseButton) {
        addExpenseButton.addEventListener("click", (event) => {
            event.preventDefault();
            addTransaction("expense");
        });
    }

    // Call the updateB function and display balance updated 
    
    updateB();
});
