import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns/esm";

const WrapperStyled = styled.div`
  width: 320px;
  margin-bottom: 20px;
  /* @media only screen and (max-width: 1200px) {
      & {
        width: 200px;
      }
  } */
  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
    @media only screen and (max-width: 1200px) {
      & {
        display: none;
      }
    }
  }

  .content {
    color: black;
    margin-left: 30px;
    line-break: anywhere;
    max-width: 100%;
  }
`;

function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({
  text,
  displayName,
  createdAt,
  photoURL,
  isMyMessage,
}) {
  return (
    <WrapperStyled
      style={{
        alignSelf: isMyMessage ? "flex-end" : "flex-start",
        display: isMyMessage ? "flex" : "",
        alignItems: isMyMessage ? "flex-end" : "",
        flexDirection: isMyMessage ? "column" : "",
      }}
    >
      <div>
        <Avatar size="small" src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div className="content">{text}</div>
    </WrapperStyled>
  );
}
