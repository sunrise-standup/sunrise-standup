const { GraphQLClient } = require("graphql-request");
const getUserInfo = require("../utils/getUserInfo");

module.exports = async function (context, req) {
  const user = getUserInfo(req);
  const name = user && user.userDetails;
  const query = `{
    user(login: "${name}") {
      avatarUrl
    }
  }`;
  const url = "https://api.github.com/graphql";
  const gql = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
    },
  });
  const response = await gql.request(query);

  context.res = {
    headers: { "Content-Type": "application/json" },
    body: {
      image: response.user.avatarUrl,
    },
  };
};
