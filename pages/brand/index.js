import Item from "@/src/components/Item";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FETCH_USED_ITEMS_OF_THE_BEST } from "../graphql/fetchUseditemsOfTheBest";
import { FETCH_USED_ITEMS } from "../graphql/fetchUsedItems";
import InfiniteScroll from "react-infinite-scroller";
import { withAuth } from "@/src/hooks/withAuth";

function Brand() {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [bestList, setBestList] = useState([]);

  const onCompletedFetchUsedItemsOfTheBest = (data) => {
    setBestList(data.fetchUseditemsOfTheBest);
  };

  const onCompletedFetchUsedItems = (data) => {
    setList(data.fetchUseditems);
  };

  useQuery(FETCH_USED_ITEMS_OF_THE_BEST, {
    onCompleted: onCompletedFetchUsedItemsOfTheBest,
  });
  const { data, fetchMore } = useQuery(FETCH_USED_ITEMS, {
    onCompleted: onCompletedFetchUsedItems,
    variables: {
      page,
    },
  });

  const onClickAdd = () => {
    router.push("/add");
  };

  const onLoadMore = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchUseditems.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditems === undefined) {
          return {
            fetchUseditems: [...prev.fetchUseditems],
          };
        }

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  return (
    <Container>
      <Best>
        <Title>BEST</Title>
        <BestList>
          {bestList.map((item, index) => (
            <Item key={item._id} item={item} />
          ))}
        </BestList>
      </Best>
      <MiddleRow>
        <AddButton onClick={onClickAdd}>상품 등록</AddButton>
        <Input>
          <input type="text" name="search" value="" />
          <Image
            src="/images/icon-search.png"
            width={24}
            height={24}
            alt="image"
          />
        </Input>
      </MiddleRow>

      <List pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchUseditems.map((item, index) => (
          <Item key={item._id} item={item} />
        ))}
      </List>
    </Container>
  );
}

export default withAuth(Brand);

const Container = styled.div({
  background: "#f5f5f5",
  minHeight: "100%",
  paddingTop: 30,
});
const AddButton = styled.button({
  width: 195,
  height: 77,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 700,
  backgroundColor: "#fff",
});
const Title = styled.p({
  fontSize: 22,
  fontWeight: 500,
  opacity: 0.6,
  textAlign: "center",
  marginBottom: 86,
});
const Best = styled.div({
  background: "#fff",
  paddingTop: 43,
  margin: "0 50px 37px",
});
const MiddleRow = styled.div({
  display: "flex",
  borderBottom: "1px solid #555555",
  margin: "0 82px 45px",
  padding: "18px 0",
  justifyContent: "space-between",
});
const Input = styled.div({
  borderBottom: "3px solid #555555",
  position: "relative",
  width: 534,
  input: {
    width: "100%",
    height: "100%",
    paddingRight: 20,
    backgroundColor: "transparent",
    border: 0,
  },
  img: {
    position: "absolute",
    right: 0,
    bottom: 10,
  },
});
const BestList = styled.div({
  overflow: "hidden",
  padding: "0 90px",
  maxWidth: 1920,
  margin: "0 auto",
});
const List = styled(InfiniteScroll)({
  overflow: "hidden",
  padding: "0 90px",
  maxWidth: 1920,
  margin: "0 auto",
});
