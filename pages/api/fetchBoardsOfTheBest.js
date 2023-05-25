import { gql } from "@apollo/client";

export const FETCH_BEST_BOARDS = gql`
  query fetchBoardsOfTheBest {
    _id
    writer
    title
    contents
    youtubeUrl
    likeCount
    dislikeCount
    images
    boardAddress
    user
    createdAt
    updatedAt
    deletedAt
  }
`;
