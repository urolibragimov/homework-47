const portfolioRow = document.querySelector('#portfolio-row');
const portfolio = document.getElementById('portfolio');
const portfolioImage = document.getElementById('portfolioImage');
const portfolioUrl = document.getElementById('portfolioUrl');
const portfolioForm = document.getElementById('portfolioForm');
const portfolioModal = document.getElementById('portfolio-modal');
const portfolioBtn = document.getElementById('portfolio-add-btn');
const modalOpenBtn = document.getElementById('modal-open-btn');

function getRow({ _id, name, url, photo }) {
	return `<tr>
      <th scope="row">${_id}</th>
      <td>
        <img width="50px" src="${IMAGE_URL}${photo._id}.${photo.name.split('.')[1]
		}" alt=${name}/>
      </td>
      <td>
        <a href="${url}">${name}</a>
      </td>
      <td>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#portfolio-modal"
					onclick="editExp('${_id}')"
        >
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteExp('${_id}')">
          <i class="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  `;
}

function getPortfolios() {
	request.get('portfolios').then(res => {
		portfolioRow.innerHTML = '';
		res.data.data.forEach(el => {
			portfolioRow.innerHTML += getRow(el);
		});
	});
}

getPortfolios();

portfolioForm.addEventListener('submit', function (e) {
	e.preventDefault();
	this.classList.add('was-validated');
	let check = this.checkValidity();
	if (check) {
		let form = new FormData();
		form.append('file', portfolioImage.files[0]);
		if (selected) {
			requestImage.post('upload', form).then(res => {
				let data = {
					name: portfolio.value,
					url: portfolioUrl.value,
					photo: res.data.data._id,
				};
				request.put(`portfolios/${selected}`, data).then(() => {
					bootstrap.Modal.getInstance(portfolioModal).hide();
					alert('portfolios is edited');
					getPortfolios();
				});
			});
		} else {
			request.post('portfolios', data).then(() => {
				bootstrap.Modal.getInstance(portfolioModal).hide();
				getPortfolios();
				alert('Portfolio is added');
			});
		}
	}
});

function editExp(id) {
	selected = id;
	portfolioBtn.innerHTML = 'Edit skill';
	let form = new FormData();
	form.append('file', portfolioImage.files[0]);
	request.put(`portfolios/${id}`).then(res => {
		portfolio.value = res.data.date.name;
		portfolioUrl.value = res.data.date.url;
		form.value = res.data.date.photo;
	});
}

function deleteExp(id) {
	let check = confirm("Siz rostdan ham o'chirishni xoxlaysizmi?");
	if (check) {
		request.delete(`portfolios/${id}`).then(() => {
			getPortfolios();
		});
	}
}

function emptyForm() {
	portfolio.value = '';
	portfolioUrl.value = '';
}

modalOpenBtn.addEventListener('click', () => {
	selected = null;
});
