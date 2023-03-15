const experienceRow = document.querySelector('#experience-row');
const experience = document.getElementById('experience');
const companyName = document.getElementById('company_name');
const description = document.getElementById('description');
const startDate = document.getElementById('start_date');
const endDate = document.getElementById('end_date');
const experienceForm = document.getElementById('experienceForm');
const experienceModal = document.getElementById('experience-modal');
const experienceBtn = document.getElementById('experience-add-btn');
const modalOpenBtn = document.getElementById('modal-open-btn');

function getRow({
	_id,
	work_name,
	company_name,
	description,
	start_date,
	end_date,
}) {
	return `<tr>
      <th scope="row">${_id}</th>
      <td>${work_name}</td>
      <td>${company_name}</td>
      <td>${description}</td>
      <td>${start_date}</td>
      <td>${end_date}</td>
      <td>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#experience-modal"
					onclick="{editExp('${_id}')}"
        >
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger" onclick="{deleteExp('${_id}')}">
          <i class="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  `;
}

function getExperience() {
	request.get('experiences').then(res => {
		experienceRow.innerHTML = '';
		res.data.data.forEach(el => {
			experienceRow.innerHTML += getRow(el);
		});
	});
}

getExperience();

experienceForm.addEventListener('submit', function (e) {
	e.preventDefault();
	this.classList.add('was-validated');
	let check = this.checkValidity();
	if (check) {
		let data = {
			work_name: experience.value,
			company_name: companyName.value,
			description: description.value,
			start_date: startDate.value,
			end_date: endDate.value,
		};
		experienceBtn.disabled = true;
		if (selected) {
			request.put(`experiences/${selected}`, data).then(() => {
				bootstrap.Modal.getInstance(experienceModal).hide();
				alert('experience is edited');
				getExperience();
			});
		} else {
			request
				.post('experiences', data)
				.then(res => {
					console.log(res);
					bootstrap.Modal.getInstance(experienceModal).hide();
					emptyForm();
					getExperience();
					alert('experience is added');
				})
				.finally(() => {
					experienceBtn.disabled = false;
				});
		}
	}
});

function editExp(id) {
	selected = id;
	experienceBtn.innerHTML = 'Edit experiences';
	request.put(`experiences/${id}`).then(res => {
		experience.value = res.data.date.work_name;
		companyName.value = res.data.date.company_name;
		description.value = res.data.date.description;
		startDate.value = res.data.date.start_date;
		endDate.value = res.data.date.end_date;
	});
}

function deleteExp(id) {
	let check = confirm("Siz rostdan ham o'chirishni xoxlaysizmi?");
	if (check) {
		request.delete(`experiences/${id}`).then(() => {
			getExperience();
		});
	}
}

function emptyForm() {
	experience.value = '';
	companyName.value = '';
	description.value = '';
	startDate.value = '';
	endDate.value = '';
}

modalOpenBtn.addEventListener('click', () => {
	selected = null;
});
