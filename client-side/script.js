let customerTemp = '';
let customers = [];

// Function to get customers from Database
async function fetchDataFroDB() {
  const dbResponse = await fetch('http://127.0.0.1:3000/customer');
  const customers = (await dbResponse.json()).data.data;

  return customers;
}

// Function to show the View All Customers page
async function showViewAllCustomers() {
  customers = await fetchDataFroDB();
  const tableBody = document.querySelector('#view-all-customers tbody');
  tableBody.innerHTML = ''; // clear the table body

  customers.forEach(function (customer) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = customer.id;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = customer.name;
    row.appendChild(nameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = customer.email;
    row.appendChild(emailCell);

    const balanceCell = document.createElement('td');
    balanceCell.textContent = customer.balance;
    row.appendChild(balanceCell);

    const viewBtnCell = document.createElement('td');
    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View';
    viewBtn.addEventListener('click', function () {
      showViewOneCustomer(customer);
    });
    viewBtnCell.appendChild(viewBtn);
    row.appendChild(viewBtnCell);

    tableBody.appendChild(row);
  });

  handleDivs('view-all-customers');
}

// Function to show the View One Customer page
function showViewOneCustomer(customer) {
  handleDivs('view-one-customer');
  // Populate customer information
  document.getElementById('customer-name').textContent = customer.name;
  document.getElementById('customer-email').textContent = customer.email;
  document.getElementById('customer-balance').textContent = customer.balance;

  customerTemp = customer;
}

// Function to show the Transfer Money page
function showTransferMoney() {
  handleDivs('transfer-money');

  // Populate customer information
  document.getElementById('sender-name').textContent = customerTemp.name;
  document.getElementById('sender-balance').textContent = customerTemp.balance;
  // console.log(customers);

  const tableBody = document.getElementById('send-to');
  tableBody.innerHTML = ''; // clear the table body

  customers.forEach(function (customer) {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = customer.id;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = customer.name;
    row.appendChild(nameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = customer.email;
    row.appendChild(emailCell);

    const balanceCell = document.createElement('td');
    balanceCell.textContent = customer.balance;
    row.appendChild(balanceCell);

    const selectBtnCell = document.createElement('td');
    const selectBtn = document.createElement('button');
    selectBtn.textContent = 'Select';
    selectBtn.addEventListener('click', function () {
      selectSender(customer);
    });
    selectBtnCell.appendChild(selectBtn);
    row.appendChild(selectBtnCell);

    tableBody.appendChild(row);
  });

  // console.log(customerTemp);
  document.getElementById('sender-id').value = customerTemp.id;
}

function selectSender(customer) {
  // console.log(customer);
  document.getElementById('receiver-id').value = customer.id;
}

async function transferMoney() {
  fetch('http://127.0.0.1:3000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      senderId: document.getElementById('sender-id').value,
      receiverId: document.getElementById('receiver-id').value,
      amount: +document.getElementById('amount').value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.data) throw data;

      console.log(data);
      const tableBody = document.querySelector('#transactions-result tbody');

      tableBody.innerHTML = ''; // clear the table body
      document.removeChild;
      const row = document.createElement('tr');

      const statusCell = document.createElement('td');
      statusCell.textContent = data.message;

      row.appendChild(statusCell);

      const senderCell = document.createElement('td');
      senderCell.textContent = data.data.data.senderId;

      row.appendChild(senderCell);

      const receiverCell = document.createElement('td');
      receiverCell.textContent = data.data.data.receiverId;

      row.appendChild(receiverCell);

      const amountCell = document.createElement('td');
      amountCell.textContent = data.data.data.amount;

      row.appendChild(amountCell);

      tableBody.appendChild(row);

      handleDivs('transactions-result');

      localStorage.setItem('data', data.message);
    })
    .catch((error) => {
      console.log(error);

      handleDivs('error');

      document.getElementById(
        'error',
      ).textContent = `Transaction Failed due to ${error.message}`;
      localStorage.setItem('error', error.message);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('transfer-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      transferMoney();
    });
});

function handleDivs(tId) {
  const ids = [
    'home-page',
    'view-all-customers',
    'view-one-customer',
    'transfer-money',
    'transactions-result',
    'error',
  ];

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] === tId) {
      document.getElementById(ids[i]).classList.remove('hidden');
    } else {
      document.getElementById(ids[i]).classList.add('hidden');
    }
  }
}
