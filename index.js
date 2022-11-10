let expenseAmount = document.querySelector('.expense_amount');
let expenseType = document.querySelector('#expense_type');
let description = document.querySelector('.description');

let form = document.querySelector('.expense_form');
let ul = document.querySelector('.expense_list');

form.addEventListener('submit', add);
ul.addEventListener('click', modify);
addEventListener('DOMContentLoaded', displayExpenseData);

async function add(e) {

    e.preventDefault();

    let expenseObject = {
        expenseAmount: expenseAmount.value,
        expenseType: expenseType.value,
        description: description.value
    }

    try {
        let expenses = await axios.post('https://crudcrud.com/api/81be5f8bcaba4d599e62729d8172fc7b/expenseData', expenseObject);

        expenseAmount.value = '';
        expenseType.value = '';
        description.value = '';
        
        let list = `<li id=${expenses.data._id}>${expenses.data.expenseAmount + "-" + expenses.data.expenseType + "-" + expenses.data.description}
        <button class=edit_btn>Edit</button>
        <button class=del_btn>Delete</button>
        </li>`;

        ul.innerHTML += list; 
    }
    catch(err) {
        console.log(err);
    }

}

async function displayExpenseData(e) {
    try {
        let expenses = await axios.get('https://crudcrud.com/api/81be5f8bcaba4d599e62729d8172fc7b/expenseData');
        expenses.data.forEach((expense) => {

            let list = `<li id=${expense._id}>${expense.expenseAmount + "-" + expense.expenseType + "-" + expense.description}
            <button class=edit_btn>Edit</button>
            <button class=del_btn>Delete</button>
            </li>`;

            ul.innerHTML += list; 
        })
    }
    catch(err) {
        console.log(err);
    }
    
}



async function modify(e) {
    if (e.target.classList.contains('edit_btn')) {

        const details = e.target.parentElement.childNodes[0].nodeValue.split('-')

        try {
            await axios.delete(`https://crudcrud.com/api/81be5f8bcaba4d599e62729d8172fc7b/expenseData/${e.target.parentElement.id}`);
            ul.removeChild(e.target.parentElement);
            expenseAmount.value = details[0];
            expenseType.value = details[1];
            description.value = details[2];
        }
        catch(err) {
            console.log(err);
        }
        
    }

    if (e.target.classList.contains('del_btn')) {

        try {
            await axios.delete(`https://crudcrud.com/api/81be5f8bcaba4d599e62729d8172fc7b/expenseData/${e.target.parentElement.id}`);
            ul.removeChild(e.target.parentElement);
        }
        catch(err) {
            console.log(err);
        }
    }
}