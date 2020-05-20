export default {
  async getLoggedInUser() {
    let user = {
      isLoggedIn: false,
      name: "",
      isAdmin: false,
    };

    const response = await fetch("/.auth/me");

    if (response.status === 200) {
      const json = await response.json();

      // the clientPrincipal object contains all of the user
      // information returned from the auth endpoint
      const clientPrincipal = json.clientPrincipal;

      // clientPrincipal will be null if the user has logged in,
      // but has not been invited to this application
      if (clientPrincipal) {
        user = {
          isLoggedIn: true,
          name: clientPrincipal.userDetails,
          isAdmin: this.isAdmin(clientPrincipal.userRoles),
        };
      }
    }

    return user;
  },

  // this function just loops through the array of user roles and
  // checks if any of them are "admin"
  isAdmin(roles) {
    return roles.find((role) => {
      return role === "admin";
    });
  },
};
