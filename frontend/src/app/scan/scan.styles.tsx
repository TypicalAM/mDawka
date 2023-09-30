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

export const ConfirmWrapper = styled.div`
    ${Wrapper} {
        overflow: auto;
        gap: 15px;
        z-index: 9;
        flex-direction: column;
        height: auto;
        background-color: white;
    }

    .button {
        height: 30px;
    }

    .react-calendar {
        border: none;
        border-radius: 1rem;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.352);
        padding: 10px;

        button {
            border-radius: 1rem;
            font-size: 1.3em;
        }

        .react-calendar__tile--active {
            background-color: var(--red);
        }
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

    -webkit-box-shadow: 0px 0px ${widthAndHeight} ${widthAndHeight};
    ${overlayColor};
    -moz-box-shadow: 0px 0px ${widthAndHeight} ${widthAndHeight} ${overlayColor};
    box-shadow: 0px 0px ${widthAndHeight} ${widthAndHeight} ${overlayColor};
`
