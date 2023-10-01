import styled from 'styled-components'

export const Text = styled.p`
    height: 20px;
    font-size: 1.4em;
    justify-content: center;
    font-weight: 400;
    text-align: center;
`

export const InputWrapper = styled.div`
    width: 350px;
    height: 45px;
`

export const InputGroup = styled.div`
    font-size: 0.9em;
    display: flex;
    width: 300px;
    height: 45px;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`

export const InputSmall = styled.div`
    font-size: 1em;
    display: flex;
    width: 50px;
    height: 40px;
`

export const InputHour = styled.div`
    font-size: 1em;
    display: flex;
    width: 90px;
    height: 40px;
    justify-content: center;
    align-items: center;
`

export const Arrow = styled.button`
    all: unset;
    color: #ef0000;
    cursor: pointer;
    font-size: 2em;

    :hover {
        color: #ff0000;
        font-weight: bold;
    }
`

export const ArrowLeft = styled(Arrow)`
    transform: rotate(180deg);
`

export const ArrowWrapper = styled.div`
  display: flex;
  width: 350px;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  animation: fadeIn 1.5s ease-in-out;
  position: absolute;
  top: 2rem;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
