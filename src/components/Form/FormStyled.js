import styled from "styled-components";

export default styled.form`
  position: relative;
  .loading {
    position: absolute;
    background-color: rgb(253 253 253 / 68%);
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`