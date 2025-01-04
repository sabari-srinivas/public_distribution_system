function updateTransaction() {
    const role = document.title.split(" ")[0].toLowerCase();
    const rice = document.getElementById('rice').value;
    const sugar = document.getElementById('sugar').value;
    const kerosene = document.getElementById('kerosene').value;

    if (role === "farmer") {
        localStorage.setItem('farmerRice', rice);
        localStorage.setItem('farmerSugar', sugar);
        localStorage.setItem('farmerKerosene', kerosene);
        localStorage.setItem('farmerTimestamp', new Date().toLocaleString());
        document.getElementById('message').innerText = "Farmer transaction updated successfully";
    } else if (role === "miller") {
        const farmerRice = localStorage.getItem('farmerRice');
        const farmerSugar = localStorage.getItem('farmerSugar');
        const farmerKerosene = localStorage.getItem('farmerKerosene');

        if (rice === farmerRice && sugar === farmerSugar && kerosene === farmerKerosene) {
            localStorage.setItem('millerRice', rice);
            localStorage.setItem('millerSugar', sugar);
            localStorage.setItem('millerKerosene', kerosene);
            localStorage.setItem('millerTimestamp', new Date().toLocaleString());
            document.getElementById('message').innerText = "Miller transaction updated successfully";
        } else {
            document.getElementById('message').innerText = "Mismatch detected";
        }
    } else if (role === "distributor") {
        const farmerRice = localStorage.getItem('farmerRice');
        const farmerSugar = localStorage.getItem('farmerSugar');
        const farmerKerosene = localStorage.getItem('farmerKerosene');

        if (rice === farmerRice && sugar === farmerSugar && kerosene === farmerKerosene) {
            const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
            const newTransaction = {
                rice,
                sugar,
                kerosene,
                timestamp: new Date().toLocaleString(),
                shopName: "Fair Price Shop",
                shopId: "123",
                shopPincode: "600042",
            };
            transactions.push(newTransaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            document.getElementById('message').innerText = "Distributor transaction updated successfully";
        } else {
            document.getElementById('message').innerText = "Mismatch detected";
        }
    }
}

function viewTransactions() {
    const role = document.title.split(" ")[0].toLowerCase();
    let message = "Transactions:\n\n";

    if (role === "farmer") {
        const rice = localStorage.getItem('farmerRice') || "No data";
        const sugar = localStorage.getItem('farmerSugar') || "No data";
        const kerosene = localStorage.getItem('farmerKerosene') || "No data";
        const timestamp = localStorage.getItem('farmerTimestamp') || "No timestamp";
        message += `Farmer - Rice: ${rice}, Sugar: ${sugar}, Kerosene: ${kerosene}, Timestamp: ${timestamp}\n`;
    } else if (role === "miller") {
        const farmerRice = localStorage.getItem('farmerRice') || "No data";
        const farmerSugar = localStorage.getItem('farmerSugar') || "No data";
        const farmerKerosene = localStorage.getItem('farmerKerosene') || "No data";
        const rice = localStorage.getItem('millerRice') || "No data";
        const sugar = localStorage.getItem('millerSugar') || "No data";
        const kerosene = localStorage.getItem('millerKerosene') || "No data";
        const farmerTimestamp = localStorage.getItem('farmerTimestamp') || "No timestamp";
        const millerTimestamp = localStorage.getItem('millerTimestamp') || "No timestamp";
        message += `Farmer - Rice: ${farmerRice}, Sugar: ${farmerSugar}, Kerosene: ${farmerKerosene}, Timestamp: ${farmerTimestamp}\n`;
        message += `Miller - Rice: ${rice}, Sugar: ${sugar}, Kerosene: ${kerosene}, Timestamp: ${millerTimestamp}\n`;
    } else if (role === "distributor") {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        if (transactions.length === 0) {
            message += "No transactions found.";
        } else {
            transactions.forEach((transaction, index) => {
                message += `Transaction ${index + 1} - Shop: ${transaction.shopName}, ID: ${transaction.shopId}, Pincode: ${transaction.shopPincode}, Rice: ${transaction.rice}, Sugar: ${transaction.sugar}, Kerosene: ${transaction.kerosene}, Timestamp: ${transaction.timestamp}\n`;
            });
        }
    }

    document.getElementById('message').innerText = message;
}

function addRowToTable() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const inventoryBody = document.getElementById("inventoryBody");

    if (!inventoryBody) {
        console.error("Error: Could not find inventoryBody element.");
        return;
    }

    // Clear the table before adding rows to avoid duplicates
    inventoryBody.innerHTML = "";

    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.shopName}</td>
            <td>${transaction.shopId}</td>
            <td>${transaction.shopPincode}</td>
            <td>${transaction.rice}</td>
            <td>${transaction.sugar}</td>
            <td>${transaction.kerosene}</td>
            <td>${transaction.timestamp}</td>
        `;

        inventoryBody.appendChild(row);
    });
}

// Call addRowToTable function once the page is loaded to ensure table body exists
window.onload = function() {
    addRowToTable();
};
