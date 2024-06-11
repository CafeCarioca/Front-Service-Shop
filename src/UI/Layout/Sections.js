import React from "react";
import styled from "styled-components";

const CenteredSection = styled.section`
  padding: 0 5%;
  background-color: ${(props) => props.bg || "none"};
`;

const CenteredSections = (props) => {
  return <CenteredSection bg={props.bg}>{props.children}</CenteredSection>;
};

export default CenteredSections;
