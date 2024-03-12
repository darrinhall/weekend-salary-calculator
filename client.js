document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let idNumber = document.getElementById('idNumber').value;
    let jobTitle = document.getElementById('jobTitle').value;
    let annualSalary = parseFloat(document.getElementById('annualSalary').value);

    let monthlySalary = annualSalary / 12;
    console.log('monthlySalary', monthlySalary);

    let annSalCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(annualSalary)

    let newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${idNumber}</td>
        <td>${jobTitle}</td>
        <td  id="annSalTableData">${annSalCurrency}</td>
        <td><button onclick="deleteEmployee(this)">Delete</button></td>
    `;
    document.getElementById('employeeList').appendChild(newRow);

    let totalMonthlyCost = parseFloat(document.getElementById('monthlyCost').textContent);
    console.log('totalMonthlyCost', totalMonthlyCost);

    totalMonthlyCost += monthlySalary;
    document.getElementById('monthlyCost').textContent = totalMonthlyCost.toFixed(2);

    if (totalMonthlyCost > 20000) {
        document.getElementById('totalCost').classList.add('over-budget');
    }

    document.getElementById('employeeForm').reset();
});

function deleteEmployee(button) {
    let row = button.parentNode.parentNode;
    let monthlySalary = parseFloat(row.children[4].textContent);
    let totalMonthlyCost = parseFloat(document.getElementById('monthlyCost').textContent);
    totalMonthlyCost -= monthlySalary;
    document.getElementById('monthlyCost').textContent = totalMonthlyCost.toFixed(2);
    row.parentNode.removeChild(row);

    if (totalMonthlyCost <= 20000) {
        document.getElementById('totalCost').classList.remove('over-budget');
    }
}