const addForm = document.getElementById('addUser');
const editForm = document.getElementById('editUser');
const deleteForm = document.getElementById('deleteUser');

async function addUser(event) {
    event.preventDefault();

    const formData = new FormData(addForm);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username.length < 3 || password.length < 3) {
        alert('Username and password must be at least 3 characters long');
        return
    }

    try {
        const response = await fetch('/admin/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        addForm.reset();
        await fetchUserList();
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

async function editUser(event) {
    event.preventDefault();

    const formData = new FormData(editForm);
    const userId = formData.get('userId');
    const username = formData.get('username');
    const password = formData.get('password');

    if (userId.length === 0) {
        alert('Please write id of user you want to edit');
        return
    }
    if (username.length < 3 || password.length < 3) {
        alert('Username and password must be at least 3 characters long');
        return
    }

    try {
        const response = await fetch('/admin/edit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, username, password }),
        });
        if (!response.ok) {
            throw new Error('Failed to edit user');
        }
        editForm.reset();
        await fetchUserList();
    } catch (error) {
        console.error('Error editing user:', error);
    }
}

async function deleteUser(event) {
    event.preventDefault();

    const formData = new FormData(deleteForm);
    const username = formData.get('username');

    if (username.length === 0) {
        alert('Please write username of user you want to delete');
        return
    }

    try {
        const response = await fetch('/admin/delete', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        deleteForm.reset();
        await fetchUserList();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

async function fetchUserList() {
    try {
        const response = await fetch('/admin/userlist');
        if (!response.ok) {
            throw new Error('Failed to fetch user list');
        }
        const userList = await response.json();
        console.log(userList);
        displayUserList(userList);
    } catch (error) {
        console.error('Error fetching user list:', error);
    }
}

function displayUserList(userList) {
    const userListElement = document.getElementById('userlist');
    userListElement.innerHTML = '';
    userList.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.name;
        userListElement.appendChild(listItem);
    });
}

addForm.addEventListener('submit', addUser);
editForm.addEventListener('submit', editUser);
deleteForm.addEventListener('submit', deleteUser);

window.addEventListener('load', fetchUserList);
