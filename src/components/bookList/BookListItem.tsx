import React from "react";
import styled from "styled-components";

const BookListItemBlock = styled.li`
  color: #fff;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid #fff;
  width: 100%;
  height: 450px;
  margin-top: 41px;
  padding: 45px 45px;
  backdrop-filter: blur(7px);
  & .Wrapper {
    position: relative;
    display: flex;
    & > img {
      width: 265px;
      height: 360px;
      margin-right: 45px;
    }
    & .Book__Info {
      max-width: 38.36vw;
      & > h3 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        max-width: 38.36vw;
        line-height: 1.5;
        height: 3em;
        -webkit-line-clamp: 2;
        font-size: 36px;
        margin-bottom: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
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
          margin: 0 40px 42px 0;
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
  }
  & .Book__Button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 150px;
    height: 60px;
    background-color: #191970;
    color: #fff;
    font-size: 16px;
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
    publisher: string,
    pubdate: string
  },
  index: number
}

const BookListItem = ({ item, index }: BookListItemProps) => {
  let { title, image, price, author, publisher, pubdate } = item;

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
          <h3>{title}</h3>
          <dl>
            <dt>정가</dt>
            <dd>{price}</dd>
            <dt>저자</dt>
            <dd>{author} | {publisher}</dd>
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
