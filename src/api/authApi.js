export default {
  async getLoggedInUser() {
    let user = {
      isLoggedIn: false,
      name: "",
      isAdmin: false,
    };

    const response = await fetch("api/.auth/me");

    if (response.status === 200) {
      const json = await response.json();
      const clientPrincipal = json.clientPrincipal;

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

  isAdmin(roles) {
    return roles.find((role) => {
      return role === "admin";
    });
  },
};
