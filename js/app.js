const container = document.querySelector('#app');

const modalDetail = document.querySelector('#modal-detail');
const tableDetail = document.querySelector('#table-detail');
const btnCloseDetail = document.querySelector('#btn-close-detail');

const modalAddSpent = document.querySelector('#modal-add-spent');
const btnCancelAdd = document.querySelector('#btn-add-cancel');
const btnConfirmAdd = document.querySelector('#btn-add-confirm');

const modalDelete = document.querySelector('#modal-confirm-delete-category');
const btnCancelDelete = document.querySelector('#btn-cancel-delete');
const btnConfirmDelete = document.querySelector('#btn-confirm-delete');

const modalAddCategory = document.querySelector('#modal-add-category');
const btnAddNewCategory = document.querySelector('#add-new-category');
const btnCancelAddNewCategory = document.querySelector('#btn-create-category-cancel');
const btnConfirmAddNewCategory = document.querySelector('#btn-create-category-confirm');

let idCategory;

let categories = [
  {
    id: 1,
    title: 'Gastos fijos',
    limit: 800,
    spent: 90,
    expenses: [
      {
        id: 1,
        desc: 'Ice cream',
        amount: 5.50,
        date: '08-04-2022'
      },
      {
        id: 2,
        desc: 'Gift',
        amount: 150.50,
        date: '07-04-2022'
      },
    ]
  },
  {
    id: 2,
    title: 'Street food',
    limit: 150,
    spent: 19.50,
    expenses: [
      {
        id: 1,
        desc: 'Malta',
        amount: 9.00,
        date: '16-04-2022'
      },
      {
        id: 2,
        desc: 'Document',
        amount: 10.50,
        date: '17-04-2022'
      },
    ]
  },
  {
    id: 3,
    title: 'Diversión',
    limit: 500,
    spent: 100,
    expenses: [
      {
        id: 1,
        desc: 'Disco',
        amount: 55.50,
        date: '08-04-2022'
      },
      {
        id: 2,
        desc: 'Concert',
        amount: 150.50,
        date: '07-04-2022'
      },
    ]
  }
]

// begin events

window.addEventListener('DOMContentLoaded', () => {
  createCardTemplate(categories);
  executeCardAction();
})

btnCancelDelete.addEventListener('click', (e) => {
  console.log('canceled');
})

btnConfirmDelete.addEventListener('click', () => {
  console.log('deleting category...');
  categories = categories.filter(c => c.id != idCategory);
  createCardTemplate(categories);
  executeCardAction();
})

btnCloseDetail.addEventListener('click', () => {
  modalDetail.close();
})

btnCancelAdd.addEventListener('click', () => {
  console.log('add new expense canceled');
  modalAddSpent.close();
})

const createCurrentDate = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = day + '-' + month + '-' + year;
  return date;
}

btnConfirmAdd.addEventListener('click', () => {
  console.log('add new expense confirmed');
  const desc = String(document.querySelector('#desc-spent').value);
  const amount = Number(document.querySelector('#amount-spent').value);
  const validation = validateAddNewExpense(desc, amount);
  if(validation){
    console.log('validation success');
    const objNewExpense = {
      desc,
      amount,
      date: createCurrentDate(),
    }
    categories.forEach(cat => {
      if(cat.id == idCategory){
        let {expenses} = cat;
        expenses.push(objNewExpense);
      }
    })
    console.log(categories)
  } else {
    console.log('validation failed');
  }
})

modalDetail.addEventListener('click', ev => {
  if(ev.target.classList.contains('icon-delete-expense')){
    const row = ev.target.closest('tr').rowIndex;
    tableDetail.deleteRow(row);
  }
})

btnAddNewCategory.addEventListener('click', () => {
  modalAddCategory.showModal()
})

btnCancelAddNewCategory.addEventListener('click', () => {
  console.log('creation new category canceled');
  modalAddCategory.close();
})

btnConfirmAddNewCategory.addEventListener('click', () => {
  console.log('creation new category confirmed');
})

// end events

const validateAddNewExpense = (desc, amount) => {
  if(desc === '' || desc === null || desc === undefined){
    alert('Error: Description');  
    return false;
  } else {
    if(amount === 0 || amount === '' || amount === null || amount === undefined || isNaN(amount)){
      alert('Error: Amount');
      return false;
    } else {
      return true;
    }
  }
}

const createCardTemplate = (data) => {
  cleanCategoryTemplate();
  data.forEach(category => {
    let { title, limit, spent, id } = category;
    let available = limit - spent;
    if (spent > limit) available = 0;
    let progress = (spent * 100) / limit;
    if (progress > 100) progress = 100;
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('id', id);
    card.innerHTML = `
      <h1>${title}</h1>
      <div class="progressbar">
        <div class="progress" style="width: ${progress}%"></div>
      </div>
      <div class="info">
        <p class="limit">Limit: ${limit}</p>
        <p class="spent">Spent: ${spent}</p>
        <p class="percentage">Progress: ${progress}%</p>
        <p class="available">Available: ${available}</p>
      </div>
      <div class="actions">
        <div class="group">
          <button class="btn-add-spent">Add spent</button>
          <button class="btn-detail">Detail</button>
        </div>
        <div class="group">
          <button class="btn-update-category">Update</button>
          <button class="btn-delete-category">Delete</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  })
}

const cleanCategoryTemplate = () => {
  while(container.firstChild){
    container.removeChild(container.firstChild);
  }
}

const cleanTableTemplate = () => {
  while (tableDetail.firstChild) {
    tableDetail.removeChild(tableDetail.firstChild);
  }
}

const openModalDetail = (id) => {
  const category = categories.filter(c => c.id == id);
  cleanTableTemplate();
  const header = document.createElement('tr');
  header.innerHTML = `
  <tr>
    <th>Item</th>
    <th>Description</th>
    <th>Amount</th>
    <th>Date</th>
    <th>Delete</th>
  </tr>
  `;
  tableDetail.appendChild(header);
  category.forEach(categ => {
    const { expenses } = categ;
    expenses.forEach((exp, index) => {
      const { desc, amount, date } = exp;
      const row = document.createElement('tr');
      row.setAttribute('id', index + 1);
      row.innerHTML += `
        <td>${index + 1}</td>
        <td>${desc}</td>
        <td>${amount}</td>
        <td>${date}</td>
        <td>
          <button>
            <span class="material-icons icon-delete-expense">delete</span>
          </button>
        </td>
      `;
      tableDetail.appendChild(row);
    })
  })
  modalDetail.showModal();
}

const openModalDelete = () => {
  modalDelete.showModal();
}

const openModalNewSpent = () => {
  modalAddSpent.showModal();
}

const openModalUpdate = id => {
  console.log('updating category...');
}

const selectModalToShow = (type, id) => {
  switch (type) {
    case 'detail':
      openModalDetail(id);
      break;
    case 'add spent':
      idCategory = id;
      openModalNewSpent();
      break;
    case 'update':
      openModalUpdate(id);
      break;
    case 'delete':
      idCategory = id;
      openModalDelete();
      break;
    default:
      break;
  }
}

const executeCardAction = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', ev => {
      const idElement = ev.target.parentNode.parentNode.parentNode.getAttribute('id');
      if (ev.target.classList.contains('btn-detail')) {
        selectModalToShow('detail', idElement);
        return;
      }
      if (ev.target.classList.contains('btn-add-spent')) {
        selectModalToShow('add spent', idElement);
        return;
      }
      if (ev.target.classList.contains('btn-delete-category')) {
        selectModalToShow('delete', idElement);
        return;
      }
      if (ev.target.classList.contains('btn-update-category')) {
        selectModalToShow('update', idElement);
        return;
      }
    })
  })
}