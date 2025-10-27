(function(){
  const searchInput = document.getElementById('searchInput');
  const chips = document.querySelectorAll('.chip');
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));

  function applyFilter(category){
    faqItems.forEach(item => {
      const cat = item.dataset.category || 'all';
      item.style.display = (category === 'all' || cat === category) ? '' : 'none';
    });
  }

  chips.forEach(c => c.addEventListener('click', e => {
    chips.forEach(x=>x.classList.remove('active'));
    e.currentTarget.classList.add('active');
    applyFilter(e.currentTarget.dataset.filter);
  }));

  function applySearch(q){
    const ql = q.trim().toLowerCase();
    faqItems.forEach(item => {
      const text = (item.querySelector('summary').textContent + ' ' + item.querySelector('.answer').textContent).toLowerCase();
      const visible = ql === '' ? true : text.includes(ql);
      const currentCat = document.querySelector('.chip.active').dataset.filter || 'all';
      const matchCategory = currentCat === 'all' || item.dataset.category === currentCat;
      item.style.display = (visible && matchCategory) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', e => applySearch(e.target.value));
  searchInput.addEventListener('keydown', e => { 
    if(e.key === 'Escape'){ 
      e.target.value=''; 
      applySearch(''); 
    }
  });

  applyFilter('all');
})();
