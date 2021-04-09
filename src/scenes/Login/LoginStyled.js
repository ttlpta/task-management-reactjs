import styled from "styled-components";
import Box from "@material-ui/core/Box";

export default styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginForm {
    &__wrapper {
      width: 370px;
      padding: ${({ theme }) => theme.spacing(3)};
    }
    &__txtField {
      &--pw {
        margin-top: ${({ theme }) => theme.spacing(2)};
      }
    }
    &__btn {
      &--submit {
        margin-top: ${({ theme }) => theme.spacing(2)};
      }
    }
  }
`;
