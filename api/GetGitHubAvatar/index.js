const { GraphQLClient } = require("graphql-request");
const userUtil = require("../utils/user");

module.exports = async function (context, req) {
  // the req object has a header that contains information about the logged in user
  // see the getUserInfo function in utils/getUserInfo
  const user = userUtil.getUserInfo(req);
  const name = user && user.userDetails;

  // compose a graphql query to get the users image based on their username
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

  // execute the graphql query
  const response = await gql.request(query);

  // send back the image url on the body
  context.res = {
    headers: { "Content-Type": "application/json" },
    body: {
      image: response.user.avatarUrl,
    },
  };
};
