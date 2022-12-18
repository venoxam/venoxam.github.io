/* eslint-disable class-methods-use-this */
import Navigate from '../Components/Router/Navigate';
import { clearActive } from '../utils/activeLink';
import { shoppingCart } from '../utils/utilsCart';
import { renderPopUp } from '../utils/utilsForm';
import { createOrder } from '../utils/utilsOrders';
import { setAuthenticatedUser } from '../utils/auths';
import Navbar from '../Components/Navbar/Navbar';

class UserLibrary {
  /* NEW FUNCTION LOGIN */

  async login() {
    const btn = document.getElementById('login');
    const btnRegister = document.getElementById('register');

    btnRegister.addEventListener('click', async (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/register');
    });

    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('pwd').value;

      const newData = {
        email,
        password,
      };

      try {
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const reponse = await fetch(`/api/users/login`, options);

        if (!reponse.ok) {
          renderPopUp();
          throw new Error(
            // eslint-disable-next-line no-irregular-whitespace
            `fetch error : ${reponse.status} : ${reponse.statusText}`,
          );
        }

        const user = await reponse.json();

        // If user has no cart, one is created
        let userCart = 'shoppingCart';
        userCart += user.email;
        if ((await localStorage.getItem(userCart)) == null) {
          await shoppingCart(user.email);
        }

        // If user has no order history, creates one
        let userOrder = 'orders';
        userOrder += user.email;
        if ((await localStorage.getItem(userOrder)) == null) {
          await createOrder(user.email);
        }
        console.log(user, 'l user');
        // sets the Authenticated user to the actual user
        await setAuthenticatedUser(user);

        // reloads Navbar (display is different when user logged in)
        await Navbar();

        // navigte to homePage
        clearActive();
        await Navigate('/');
      } catch (err) {
        // eslint-disable-next-line
        console.error('error: ', err);
      }
    });
  }

  /* NEW FUNCTION REGISTER */

  async register() {
    const btn = document.getElementById('register');
    const btnLogin = document.getElementById('login');

    btnLogin.addEventListener('click', async (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/login');
    });

    // Adding the user after pressing the submit button
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Recovery of all data with id
      const lastname = document.getElementById('nom').value;
      const firstname = document.getElementById('prenom').value;
      const email = document.getElementById('email').value;
      const homme = document.getElementById('homme').checked;
      const femme = document.getElementById('femme').checked;
      const autre = document.getElementById('autre').checked;
      const password = document.getElementById('mdp').value;
      const passwordConfirmed = document.getElementById('mdp2').value;

      // Checkbox verification
      let sex;
      if (homme === true) {
        sex = 'M';
      }
      if (femme === true) {
        sex = 'F';
      }
      if (autre === true) {
        sex = 'A';
      }

      // If values are undifined
      if (
        lastname.value === undefined ||
        firstname.value === undefined ||
        email.value === undefined ||
        password.value === undefined ||
        passwordConfirmed.value === undefined
      ) {
        console.error('Please, complete all the forms');
      }

      if (password !== passwordConfirmed) {
        console.error("Passwords don't match");
      }

      // Creation of a new json object
      const newData = {
        lastname,
        firstname,
        email,
        password,
        passwordConfirmed,
        sex,
      };

      try {
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const reponse = await fetch(`/api/users/register`, options);

        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }

        shoppingCart(email);
        createOrder(email);
        clearActive();
        Navigate('/login');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
      }
    });
  }

  async becomeSeller(user) {
    const btn = document.getElementById('sell');

    // Ajout de l'utilisateur aprés avoir appuyé sur le bouton submit
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Récupération de toute les données avec les id
      const storeName = document.getElementById('storename').value;
      const country = document.getElementById('country').value;
      const city = document.getElementById('city').value;
      const zipCode = document.getElementById('zipcode').value;
      const street = document.getElementById('street').value;
      const building = document.getElementById('buildingcode').value;

      // Création d'un nouvel objet json
      const newData = {
        userID: user.userId,
        storeName,
        country,
        city,
        zipCode,
        street,
        building,
      };

      try {
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        console.log('logloglog');
        // const reponse = await fetch(`${process.env.API_BASE_URL}/api/users/becomeSeller`, options);
        const reponse = await fetch(`/api/users/becomeSeller`, options);

        console.log('logfgfdgfdgdgloglog');
        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }
        clearActive();
        Navigate('/user');
        /* const user = await reponse.json(); */
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
      }
    });
  }

  async changeFirstName(user) {
    const firstnamebtn = document.getElementById('firstnameBtn');
    firstnamebtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const firstName = document.getElementById('first_name').value;

      const NewData = {
        firstName,
        id: user.userId,
      };

      if (firstName.length < 1) {
        const erreur = document.getElementById('message');
        erreur.innerHTML = `
          <div id="snackbar">No value detected</div>
        `;
        renderPopUp();
      } else {
        try {
          const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(NewData),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          // const reponse = await fetch(`${process.env.API_BASE_URL}/api/users/updateUser`, options);

          const reponse = await fetch(`/api/users/updateUserFirstName`, options);

          if (!reponse.ok) {
            throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
          }
          const newUser = {
            userId: user.userId,
            email: user.email,
            firstName,
            lastName: user.lastName,
            password: user.password,
          };
          if (firstName !== undefined) {
            newUser.firstName = firstName;
          }
          setAuthenticatedUser(newUser);
          const meesage = document.getElementById('message');
          meesage.innerHTML = `
            <div id="snackbar">Your first name has been updated!</div>
          `;
          renderPopUp();
          Navigate('/user?idSeller=', user.userId);
          /* const user = await reponse.json(); */
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('error: ', err);
        }
      } // fin else
    }); // fin listener
  }

  async changeLastName(user) {
    const lastnamebtn = document.getElementById('lastnameBtn');
    lastnamebtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const lastName = document.getElementById('last_name').value;

      const NewData = {
        lastName,
        id: user.userId,
      };
      if (lastName.length < 1) {
        const erreur = document.getElementById('message');
        erreur.innerHTML = `
          <div id="snackbar">No value detected</div>
        `;
        renderPopUp();
      } else {
        try {
          const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(NewData),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          // const reponse = await fetch(`${process.env.API_BASE_URL}/api/users/updateUser`, options);

          const reponse = await fetch(`/api/users/updateUserLastName`, options);

          if (!reponse.ok) {
            throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
          }
          const newUser = {
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName,
            password: user.password,
          };
          if (lastName !== undefined) {
            newUser.lastName = lastName;
          }
          setAuthenticatedUser(newUser);
          const meesage = document.getElementById('message');
          meesage.innerHTML = `
            <div id="snackbar">Your last name has been updated!</div>
          `;
          renderPopUp();
          Navigate('/user?idSeller=', user.userId);
          /* const user = await reponse.json(); */
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('error: ', err);
        }
      } // fin else
    }); // fin listener
  }

  async changeEmail(user) {
    const emailbtn = document.getElementById('emailBtn');
    emailbtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;

      const userDB = await this.getUserEmail(email);
      console.log(userDB[0], 'truc user db');

      if (email.length < 1) {
        const erreur = document.getElementById('message');
        erreur.innerHTML = `
          <div id="snackbar">Enter a valid email</div>
        `;
        renderPopUp();
      } else if (userDB[0].length > 0) {
        const erreur = document.getElementById('message');
        erreur.innerHTML = `
          <div id="snackbar">This email is already used</div>
        `;
        renderPopUp();
      } else {
        try {
          const NewData = {
            email,
            id: user.userId,
          };
          const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(NewData),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          // const reponse = await fetch(`${process.env.API_BASE_URL}/api/users/updateUser`, options);

          const reponse = await fetch(`/api/users/updateUserEmail`, options);

          if (!reponse.ok) {
            throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
          }
          const newUser = {
            userId: user.userId,
            email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
          };
          if (email !== undefined) {
            newUser.email = email;
          }
          setAuthenticatedUser(newUser);
          const meesage = document.getElementById('message');
          meesage.innerHTML += `
            <div id="snackbar">Your email has been updated!</div>
          `;
          renderPopUp();
          Navigate('/user?idSeller=', user.userId);
          /* const user = await reponse.json(); */
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('error: ', err);
        }
      } // fin else
    });
  }

  async changePassword(user) {
    const passwordbtn = document.getElementById('passwordBtn');
    passwordbtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const password = document.getElementById('password').value;
      const confpassword = document.getElementById('confpassword').value;

      const NewData = {
        password,
        id: user.userId,
      };

      if (password === confpassword) {
        try {
          const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(NewData),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          // const reponse = await fetch(`${process.env.API_BASE_URL}/api/users/updateUser`, options);

          const reponse = await fetch(`/api/users/updateUserPassword`, options);

          if (!reponse.ok) {
            throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
          }
          const newUser = {
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password,
          };
          if (password !== undefined) {
            newUser.password = password;
          }
          setAuthenticatedUser(newUser);
          const meesage = document.getElementById('message');
          meesage.innerHTML = `
            <div id="snackbar">Your password has been updated!</div>
          `;
          renderPopUp();
          Navigate('/user?idSeller=', user.userId);
          /* const user = await reponse.json(); */
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('error: ', err);
        }
      } else {
        const erreur = document.getElementById('message');
        erreur.innerHTML = `
          <div id="snackbar">Your passwords do not match!</div>
        `;
        renderPopUp();
      }
    });
  } // fin else

  async getUserEmail(email) {
    let idUSER;
    try {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(email),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // const reponse = await fetch(`${process.env.API_BASE_URL}/api/users/updateUser`, options);

      // eslint-disable-next-line prefer-template
      const reponse = await fetch(`/api/users/getUserEmail`, options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      idUSER = await reponse.json();
      /* const user = await reponse.json(); */
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    return idUSER;
  }
}

export default UserLibrary;
