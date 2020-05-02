export default {
  async getLoggedInUser() {
    let user = {
      isLoggedIn: true,
      name: "",
      isAdmin: true,
    };

    const response = await fetch(".auth/me");

    if (response.status === 200) {
      const json = await response.json();
      const clientPrincipal = json.clientPrincipal;

      if (clientPrincipal) {
        user = {
          isLoggedIn: true,
          name: clientPrincipal.userDetails,
          isAdmin: true,
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
