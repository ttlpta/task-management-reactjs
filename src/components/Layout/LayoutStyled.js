import styled from "styled-components";
import Box from "@material-ui/core/Box";


export default styled(Box)`
  .app {
    &__body {
      height: calc(100vh - 64px - 1rem);
      padding: 0.5rem 1rem;
    }
    &__title {
      flex: 1;
    }
  }
`