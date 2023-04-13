const container = document.querySelector('#app');
const modalDetail = document.querySelector('#modal-detail');
const tableDetail = document.querySelector('#table-detail');
const btnCloseDetail = document.querySelector('#btn-close-detail');
const modalAddSpent = document.querySelector('#modal-add-spent');

let categories = [
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
          <button>Update</button>
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

const openModalDelete = id => {
  const newArr = categories.filter(cat => cat.id != id);
  categories = newArr;
  createCardTemplate(categories);
  console.log(categories);
}

const openModalNewSpent = id => {
  console.log('adding spent...');
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

// const getThisDate = () => {
//   const thisDay = new Date().getDate();
//   const thisMonth = new Date().getMonth() + 1;
//   const thisYear = new Date().getFullYear();
//   return `${thisYear}-${thisMonth}-${thisDay}`;
// }

// const saveExpense = (id, desc, amount) => {
//   categories.forEach( category => {
//     if (category.id == id) {
//       const objNewExpense = {
//         desc, 
//         amount: Number(amount), 
//         date: getThisDate()
//       };
//       category.expenses = [...category.expenses, objNewExpense]
//       console.log(category.expenses)
//     }
//   })
// }

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
    })
  })
}

btnCloseDetail.addEventListener('click', () => {
  modalDetail.close();
})

window.addEventListener('DOMContentLoaded', () => {
  createCardTemplate(categories);
  executeCardAction();
})