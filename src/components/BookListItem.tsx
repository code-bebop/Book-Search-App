import React from "react";
import styled from "styled-components";

const BookListItemBlock = styled.li`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 450px;
  margin-top: 41px;
  padding: 45px 45px;
  & .Wrapper {
    position: relative;
    display: flex;
    & > img {
      max-width: 320px;
      height: 360px;
      margin-right: 45px;
      flex: 2;
    }
  }
  & .Book__Info {
    flex: 1;
    & > h3 {
      font-size: 42px;
      margin-bottom: 30px;
    }
    & > dl {
      & > dt,
      & > dd {
        font-size: 18px;
      }
      & > dt {
        display: block;
        float: left;
        width: auto;
        margin: 0 40px 25px 0;
        font-weight: bold;
      }
      & > dd {
        padding-left: 100px;
        &:after {
          content: "";
          display: block;
          clear: both;
        }
      }
    }
  }
  & .Book__Button {
    width: 150px;
    height: 60px;
    background-color: #fff;
    align-self: flex-end;
    border: none;
    outline: none;
    cursor: pointer;
  }
  & + & {
    margin-top: 57px;
  }
`;

type BookListItemProps = {
  item: {
    title: string,
    image: string,
    price: string,
    author: string,
    pubdate: string
  },
  index: number
}

const BookListItem = ({ item, index }: BookListItemProps) => {
  let { title, image, price, author, pubdate } = item;

  title = title.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
  author = author.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
  return (
    <BookListItemBlock>
      <div className="Wrapper">
        <img
          src={image}
          alt={title}
        />
        <div className="Book__Info">
          <h3>{title.length > 20 ? `${title.substr(0, 20)}...` : title}</h3>
          <dl>
            <dt>정가</dt>
            <dd>{price}</dd>
            <dt>저자</dt>
            <dd>{author}</dd>
            <dt>출간일</dt>
            <dd>{pubdate}</dd>
          </dl>
        </div>
        <button className="Book__Button" id={index.toString()}>
          이 작품을 추천
        </button>
      </div>
    </BookListItemBlock>
  );
};

export default BookListItem;
