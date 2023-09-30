import { styled } from 'styled-components'

const overlayColor = 'rgba(66, 68, 90, 0.5)'
const widthAndHeight = '100vh'

export const Wrapper = styled.div`
    isolation: isolate;

  position: absolute;

  display: flex;

  left: 0;

  top: 0;
  overflow-x: hidden;
  width: 100vw;
  align-items: center;
  justify-content: center;

  overflow-y: hidden;
  .drawingBuffer {
    display: none;
  }

  br {
    display: none;
  }
  video {
    height: 100vh;
  }
`

export const Overlay = styled.div`
    position: absolute;
    aspect-ratio: 3/1;
    width: 350px;
    background-color: transparent;
    margin: auto;
    z-index: 2;
    border-radius: 15px;

    -webkit-box-shadow: 0px 0px ${widthAndHight} ${widthAndHight} ${overlayColor};
    -moz-box-shadow: 0px 0px ${widthAndHight} ${widthAndHight} ${overlayColor};
    box-shadow: 0px 0px ${widthAndHight} ${widthAndHight} ${overlayColor};
`;

export const Loader = styled.div`
    z-index: 9;

    ${Wrapper}{
        background-color: white;
    }

`;
