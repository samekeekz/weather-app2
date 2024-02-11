const addForm = document.getElementById('addUser');
const editForm = document.getElementById('editUser');
const deleteForm = document.getElementById('deleteUser');

// Function to add a new user
async function addUser(event) {
    event.preventDefault();

    const formData = new FormData(addForm);
    const username = formData.get('username');
    const password = formData.get('password');

    console.log(username, password);
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
        // Reload the user list after adding a new user
        await fetchUserList();
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Function to edit an existing user
async function editUser(event) {
    event.preventDefault();

    const formData = new FormData(editForm);
    const userId = formData.get('userId');
    const username = formData.get('username');
    const password = formData.get('password');
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
        // Reload the user list after editing a user
        await fetchUserList();
    } catch (error) {
        console.error('Error editing user:', error);
    }
}

// Function to delete an existing user
async function deleteUser(event) {
    event.preventDefault();

    const formData = new FormData(deleteForm);
    const username = formData.get('username');

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
        // Reload the user list after deleting a user
        await fetchUserList();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Function to fetch and display the list of users
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

// Function to display the list of users
function displayUserList(userList) {
    const userListElement = document.getElementById('userlist');
    userListElement.innerHTML = '';
    if (userList.length === 0) {
        const listItem = document.createElement('h3');
        listItem.textContent = "Users list is empty";
        userListElement.appendChild(listItem);
    }
    userList.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.name;
        userListElement.appendChild(listItem);
    });
}

// Event listeners for form submissions
addForm.addEventListener('submit', addUser);
editForm.addEventListener('submit', editUser);
deleteForm.addEventListener('submit', deleteUser);

// Fetch and display the initial list of users when the page loads
window.addEventListener('load', fetchUserList);
