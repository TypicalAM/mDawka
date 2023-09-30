import { styled } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  p {
    color: #EF0000;
    width: min-content;
    overflow: hidden;
    font-family: 'Montserrat', serif;
    font-weight: bold;
  }

  p:nth-child(3) {
    color: #676767;
    font-weight: 400;
  }

  p:nth-child(2) {
    animation: fade 1.5s ease;
    width: 0;
  }

  @keyframes fade {
    0% {
      width: 25px
    }
    40% {
      width: 25px;
    }
    100% {
      width: 0;
    }
  }
`
