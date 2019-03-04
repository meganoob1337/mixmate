import auth0 from 'auth0-js';
import {AUTH_CONFIG} from './Auth0Variables';

class Auth {
  constructor() {
    console.log(process.env.NODE_ENV)
    let databaseURL = process.env.NODE_ENV === 'production'
    ? "https://mixmate.herokuapp.com"
    : "http://localhost:5002";
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: AUTH_CONFIG.domain,
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: `${databaseURL}/callback`,
      responseType: 'id_token',
      scope: 'openid profile email'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        this.getCurrentUser()
        .then(() => resolve());
      });
    })
  }

  getCurrentUser() {
    let databaseURL = process.env.NODE_ENV === 'production'
    ? "/"
    : "http://localhost:5002";
    return new Promise((resolve, reject) => {
      const userId = localStorage.getItem("userId");
      if (userId !== null) {
        resolve(userId);
      } else if (this.profile) {
          fetch(`${databaseURL}/users?sub=${this.profile.sub}`)
            .then(u => u.json())
            .then(users => {
              if (users.length) {
                localStorage.setItem("userId", users[0].id);
                resolve(users[0].id);
              } else {
                let obj = {
                  "name": this.profile.nickname,
                  "email": this.profile.email,
                  "sub": this.profile.sub
                };
                fetch(`${databaseURL}/users`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(obj)
                })
                  .then(user => user.json())
                  .then(user => {
                    localStorage.setItem("userId", user.id);
                    resolve(user.id);
                  });
              }
            });
      }
    });
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    localStorage.removeItem("userId");
  }
}

const auth0Client = new Auth();

export default auth0Client;