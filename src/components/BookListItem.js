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
    & > div {
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
  }
  & + & {
    margin-top: 57px;
  }
`;

const BookListItem = ({ image, title, price, author, pubdate }) => {
  return (
    <BookListItemBlock>
      <div className="Wrapper">
        <img
          src={image}
          alt={title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
        />
        <div>
          <h3>{title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}</h3>
          <dl>
            <dt>정가</dt>
            <dd>{price}</dd>
            <dt>저자</dt>
            <dd>{author}</dd>
            <dt>출간일</dt>
            <dd>{pubdate}</dd>
          </dl>
        </div>
      </div>
    </BookListItemBlock>
  );
};

export default BookListItem;
