const container = document.querySelector('#app');

const categories = [
  {
    title: 'Gastos fijos',
    limit: 0,
    spent: 90
  },
  {
    title: 'Diversión',
    limit: 500,
    spent: 100
  }
]

const calcProgress = (pLimit, pSpent) => {
  const progress = (pSpent * 100) / pLimit;
  if (pSpent > pLimit) progress = 100;
}

const createCardTemplate = (data) => {
  data.forEach(category => {
    let { title, limit, spent } = category;

    let available = limit - spent;
    if(spent > limit) available = 0;

    let progress = (spent * 100) / limit;
    if(progress > 100) progress = 100;

    const card = document.createElement('div');
    card.className = 'card';
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
          <button>Details</button>
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