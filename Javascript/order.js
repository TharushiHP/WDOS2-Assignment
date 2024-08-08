document.addEventListener("DOMContentLoaded", function() {
    const orderSummaryTable = document.querySelector('#order-summary tbody');
    const totalPriceElement = document.querySelector('#total-price');
    const payButton = document.querySelector('#pay');
    const confirmationMessage = document.querySelector('#confirmationMessage');

    function clearOrderSummary() {
        localStorage.removeItem('orderItems'); 
        localStorage.removeItem('totalPrice'); 
    }
    

    //function to get the order summary table from the local storage
    function populateOrderSummary() {
        const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
        const totalPrice = localStorage.getItem('totalPrice') || 'Rs.0';

        
        //looping through each order item and creating a row in the table
        orderItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
            `;
            orderSummaryTable.appendChild(row);
        });

        totalPriceElement.textContent = totalPrice;
    }


    //function for the confirmation message
    function showConfirmationMessage() {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3); 

        confirmationMessage.style.display = 'block';
        confirmationMessage.innerHTML = `
            <h3>Thank you for your order!</h3>
            <p>Your order will be delivered on: ${deliveryDate.toDateString()}</p>
        `;
    }

    
    //event listener for the pay button
    payButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        showConfirmationMessage();
        clearOrderSummary();
    });

    populateOrderSummary();
    clearOrderSummary();
});
