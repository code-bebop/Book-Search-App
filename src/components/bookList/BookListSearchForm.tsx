import React from 'react';
import styled from 'styled-components';

const SearchBookForm = styled.form`
  margin-top: 60px;
  text-align: center;
  & > input {
    font-size: 48px;
    font-weight: bold;
    color: white;
    text-align: center;
    padding-bottom: 18px;
    background-color: transparent;
    border: none;
    border-bottom: 5px solid #3B3BC4;
    outline: none;
    min-width: 338px;
  }
  & > button {
    display: none;
  }
`;

type BookListSearchFormProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  getData: (e: React.FormEvent<HTMLFormElement>) => void,
  query: string
}

const BookListSearchForm = ({ onChange, getData, query }: BookListSearchFormProps) => {
  return (
    <SearchBookForm onSubmit={getData}>
      <input onChange={onChange} value={query} placeholder="여기에 검색어 입력" />
      <button type="submit">검색</button>
    </SearchBookForm>
  )
}

export default BookListSearchForm;