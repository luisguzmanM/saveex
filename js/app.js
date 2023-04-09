const container = document.querySelector('#app');

const categories = [
  {
    id: 1,
    title: 'Gastos fijos',
    limit: 0,
    spent: 90
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
    if(spent > limit) available = 0;

    let progress = (spent * 100) / limit;
    if(progress > 100) progress = 100;

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
          <button>Add spent</button>
          <button>Detail</button>
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

window.addEventListener('DOMContentLoaded', () => {
  createCardTemplate(categories);
})