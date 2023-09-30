import { styled } from 'styled-components';

const overlayColor = 'rgba(66, 68, 90, 0.5)';
const widthAndHight = '100vh'

export const Wrapper = styled.div`

    position: absolute;

    display: flex;

    left: 0;

    top: 0;
    width: 100vw;
    height: 100vh;

    align-items: center;
    justify-content: center;

    overflow: hidden;

    .drawingBuffer{
        display: none;
    }
    br{
        display: none;
    }
`;

export const Overlay = styled.div`
    position: absolute;
    aspect-ratio: 3/1;
    width: 350px;
    background-color: transparent;
    margin: auto;
    z-index: 999;
    border-radius: 15px;
    -webkit-box-shadow: 0px 0px ${widthAndHight} ${widthAndHight} ${overlayColor};
    -moz-box-shadow: 0px 0px ${widthAndHight} ${widthAndHight} ${overlayColor};
    box-shadow: 0px 0px ${widthAndHight} ${widthAndHight} ${overlayColor};
`;