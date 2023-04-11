const container = document.querySelector('#app');
const modalDetail = document.querySelector('#modal-detail');
const tableDetail = document.querySelector('#table-detail');
const btnCloseDetail = document.querySelector('#btn-close-detail');
const modalAddSpent = document.querySelector('#modal-add-spent');

const categories = [
  {
    id: 1,
    title: 'Gastos fijos',
    limit: 0,
    spent: 90,
    expenses: [
      {
        desc: 'Ice cream',
        amount: 5.50,
        date: '08-04-2022'
      },
      {
        desc: 'Gift',
        amount: 150.50,
        date: '07-04-2022'
      },
      {
        desc: 'Gift',
        amount: 150.50,
        date: '07-04-2022'
      },
      {
        desc: 'Gift',
        amount: 150.50,
        date: '07-04-2022'
      },
      {
        desc: 'Gift',
        amount: 150.50,
        date: '07-04-2022'
      },
    ]
  },
  {
    id: 2,
    title: 'Diversión',
    limit: 500,
    spent: 100,
    expenses: [
      {
        desc: 'Disco',
        amount: 55.50,
        date: '08-04-2022'
      },
      {
        desc: 'Concert',
        amount: 150.50,
        date: '07-04-2022'
      },
    ]
  }
]

const calcProgress = (pLimit, pSpent) => {
  const progress = (pSpent * 100) / pLimit;
  if (pSpent > pLimit) progress = 100;
}

const createCardTemplate = (data) => {
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
          <button>Update</button>
          <button>Delete</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  })
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
  </tr>
  `;
  tableDetail.appendChild(header);

  category.forEach(categ => {
    const { expenses } = categ;
    expenses.forEach((exp, index) => {
      const { desc, amount, date } = exp;
      const row = document.createElement('tr');
      row.innerHTML += `
        <td>${index + 1}</td>
        <td>${desc}</td>
        <td>${amount}</td>
        <td>${date}</td>
      `;
      tableDetail.appendChild(row);
    })
  })
  modalDetail.showModal();
}

const showModalTemplate = (type, id) => {
  switch (type) {
    case 'detail':
      openModalDetail(id);
      break;
    case 'add spent':
      openModalNewSpent(id);
      break;
    case 'update':
      openModalUpdate(id);
      break;
    case 'delete':
      openModalDelete(id);
      break;
    default:
      break;
  }
}

const openModalNewSpent = (id) => {
  modalAddSpent.showModal();
  validateAddNewExpense(id);
}

const getThisDate = () => {
  const thisDay = new Date().getDate();
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();
  return `${thisYear}-${thisMonth}-${thisDay}`;
}

const saveExpense = (id, desc, amount) => {
  categories.forEach( category => {
    if (category.id == id) {
      const objNewExpense = {
        desc, 
        amount: Number(amount), 
        date: getThisDate()
      };
      category.expenses = [...category.expenses, objNewExpense]
      console.log(category.expenses)
    }
  })
}

const validateAddNewExpense = id => {
  modalAddSpent.addEventListener('close', () => {
    const desc = document.querySelector('#desc-spent').value;
    const amount = document.querySelector('#amount-spent').value;
    if (modalAddSpent.returnValue === 'cancel') {
      return;
    } else {
      if (desc === '') {
        alert('desc empty');
        modalAddSpent.showModal();
      } else {
        if (amount === '') {
          alert('amount is empty')
          modalAddSpent.showModal();
        } else {
          saveExpense(id, desc, amount);
        }
      }
    }
  })
}

const showDetail = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', ev => {
      if (ev.target.classList.contains('btn-detail')) {
        const idElement = ev.target.parentNode.parentNode.parentNode.getAttribute('id');
        showModalTemplate('detail', idElement);
        return;
      }
      if (ev.target.classList.contains('btn-add-spent')) {
        const idElement = ev.target.parentNode.parentNode.parentNode.getAttribute('id');
        showModalTemplate('add spent', idElement);
        return;
      }
    })
  })
}

btnCloseDetail.addEventListener('click', () => {
  modalDetail.close();
})

window.addEventListener('DOMContentLoaded', () => {
  createCardTemplate(categories);
  showDetail();
})