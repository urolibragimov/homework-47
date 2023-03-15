const skillsRow = document.querySelector('#skills-row');
const skills = document.getElementById('skills');
const skillsPercent = document.getElementById('skillsPercent');
const skillsForm = document.getElementById('skillsForm');
const skillsModal = document.getElementById('skills-modal');
const skillsBtn = document.getElementById('skills-add-btn');
const modalOpenBtn = document.getElementById('modal-open-btn');

function getRow({ _id, name, percent }) {
	return `<tr>
      <th scope="row">${_id}</th>
      <td>${name}</td>
      <td>${percent}%</td>
      <td>
        <button 
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#skills-modal"
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

function getSkills() {
	request.get('skills').then(res => {
		skillsRow.innerHTML = '';
		console.log(res);
		res.data.data.forEach(el => {
			skillsRow.innerHTML += getRow(el);
		});
	});
}

getSkills();

skillsForm.addEventListener('submit', function (e) {
	e.preventDefault();
	this.classList.add('was-validated');
	let check = this.checkValidity();
	if (check) {
		let data = {
			name: skills.value,
			percent: skillsPercent.value,
		};
		if (selected) {
			request.put(`skills/${selected}`, data).then(() => {
				bootstrap.Modal.getInstance(skillsModal).hide();
				alert('skills is edited');
				getSkills();
			});
		} else {
			request.post('skills', data).then(() => {
				bootstrap.Modal.getInstance(skillsModal).hide();
				emptyForm();
				getSkills();
				alert('Skill is added');
			});
		}
	}
});

function editExp(id) {
	selected = id;
	skillsBtn.innerHTML = 'Edit skill';
	request.put(`skills/${id}`).then(res => {
		skills.value = res.data.date.name;
		skillsPercent.value = res.data.date.percent;
	});
}

function deleteExp(id) {
	let check = confirm("Siz rostdan ham o'chirishni xoxlaysizmi?");
	if (check) {
		request.delete(`skills/${id}`).then(() => {
			getSkills();
		});
	}
}

function emptyForm() {
	skills.value = '';
	skillsPercent.value = '';
}

modalOpenBtn.addEventListener('click', () => {
	selected = null;
});
