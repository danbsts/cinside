/* eslint-disable no-param-reassign */
import React, { useState } from 'react';

import { css, cx } from '@emotion/css';
import { Link } from 'react-router-dom';

import useDikastisRouting, { useQueryParams } from 'router/useDikastisRouting';

import DktButton from 'shared/DktButton';
import DktCard from 'shared/DktCard';
import DktText from 'shared/DktText';
import FlexLayout from 'shared/FlexLayout';

const cardStyle = css`
  margin: 40px auto;
  width: 68%;
`;
const containerStyle = css`
  max-width: 300px;
  margin-right: 40px;
`;
const goToStyle = css`
  width: fit-content;
`;
const inputStyle = css`
  background-color: #F4F4F4;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  width: 48px;
  margin: 0 12px;
  font-size: 20px;
`;
const numberStyle = css`
  padding: 8px;
  text-decoration: none;
  color: #909090;
`;
const selectedNumberStyle = css`
  border-bottom: 1px solid #235BFF;
  color: #EEE;
`;

const addNumbers = (start, end, array) => {
  let i = start;
  while (i <= end) {
    array.push(i);
    i += 1;
  }
};

const getPages = (currentPage, totalPages) => {
  const result = [];
  if (currentPage <= 4) {
    addNumbers(1, currentPage + 1 < totalPages ? currentPage + 1 : totalPages, result);
  } else {
    addNumbers(1, 2, result);
    result.push(-1);
  }
  if (currentPage > 4 && currentPage <= totalPages - 4) {
    addNumbers(currentPage - 1, currentPage + 1, result);
  }
  if (currentPage <= totalPages - 4) {
    result.push(-2);
    addNumbers(totalPages - 1, totalPages, result);
  } else {
    const lastElement = result[result.length - 1];
    const start = currentPage - 1 > lastElement + 1 ? currentPage - 1 : lastElement + 1;
    addNumbers(start, totalPages, result);
  }

  return result;
};

function PageNumber({ number, path, selected }) {
  const selectedStyle = selected ? selectedNumberStyle : undefined;

  if (number < 0) return <div className={numberStyle}>...</div>;

  return (
    <Link className={cx(numberStyle, selectedStyle)} to={`${path}&page=${number}`}>
      <div>{number}</div>
    </Link>
  );
}

// TODO - add next and previous page icon
export default function PaginationBox({ currentPage, totalPages }) {
  const { status, visibility } = useQueryParams();
  const { path } = useDikastisRouting();
  const pageNumbers = getPages(currentPage, totalPages);
  const [goTo, setGoTo] = useState(1);

  const onChange = (event) => {
    const page = event.target.value;
    if (page > totalPages || page < 0) {
      event.target.value = goTo;
      return;
    }
    setGoTo(page === 0 ? 1 : page);
  };

  return (
    <DktCard style={cardStyle}>
      <FlexLayout alignItems="center" justifyContent="center">
        <FlexLayout alignItems="center" justifyContent="space-between" style={containerStyle}>
          {pageNumbers.map((i) => (
            <PageNumber
              key={i}
              number={i}
              path={`${path}?visibility=${visibility}&status=${status}`}
              selected={i === currentPage}
            />
          ))}
        </FlexLayout>
        <FlexLayout alignItems="center" style={goToStyle}>
          <DktText holder="p">Go to page: </DktText>
          <input className={inputStyle} placeholder={goTo} type="number" onChange={onChange} />
          <DktButton href={`${path}?visibility=${visibility}&status=${status}&page=${goTo}`}>Go</DktButton>
        </FlexLayout>
      </FlexLayout>
    </DktCard>
  );
}
