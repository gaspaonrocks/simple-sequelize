'use strict';

// wait for the doc to be loaded before calling method
document.addEventListener('DOMContentLoaded', () => {
  getAllUsers();
});

const UL = document.getElementById('list');

function getAllUsers () {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          console.log(JSON.parse(xhr.responseText));
          fillUsersTable(JSON.parse(xhr.responseText));
        } catch (e) {
          console.log('ERROR:', e);
        }
      }
    }
  };

  xhr.open('GET', '/user');
  xhr.send();
}

function deleteUser (id) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          console.log('user deleted');
          deleteUserHTML(id);
        } catch (e) {
          console.log('ERROR:', e);
        }
      }
    }
  };

  xhr.open('GET', `/user/delete/${id}`);
  xhr.send();
}

function addUser () {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        try {
          console.log(JSON.parse(xhr.responseText));
          createUserHTML(JSON.parse(xhr.responseText));
        } catch (e) {
          console.log('ERROR:', e);
        }
      }
    }
  };

  xhr.open('GET', `/user/create`);
  xhr.send();
}

/**
 * Fill the user table with the users table received from the server
 * @param {object array} users 
 */
function fillUsersTable (users) {
  for (let i = 0; i < users.length; i++) {
    createUserHTML(users[i]);
  }
}

function deleteUserHTML (num) {
  let elem = document.getElementById(`${num}`);
  elem.remove();
}

function createUserHTML (user) {
  let li = document.createElement('li');

  let markup = `${user.firstName} ${user.lastName}`;

  li.innerHTML = markup;
  li.id = user.id;

  li.onclick = function (evt) {
    deleteUser(evt.currentTarget.id);
  };

  UL.appendChild(li);
}

document.getElementById('add').onclick = (evt) => {
  addUser();
}