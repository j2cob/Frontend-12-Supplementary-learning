import { RESTORE_ACCESS_TOKEN } from "@/src/graphql/restoreAccessToken";
import { gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";

export async function getAccessToken() {
  try {
    const graphqlClient = new GraphQLClient(
      "https://backend-practice.codebootcamp.co.kr/graphql",
      {
        credentials: "include",
      }
    );
    const result = await graphqlClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;

    return newAccessToken;
  } catch (error) {
    console.log(error.message);
  }
}
