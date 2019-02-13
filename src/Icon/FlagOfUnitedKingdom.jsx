import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  background: #00257d;
  overflow: hidden;
`

const mainLinesWidth = 10
const mainLinesBorderWidth = 5
const rotatedLinesWidth = mainLinesWidth / 2
const rotatedLinesBorderWidth = 3

const HorizontalRedLine = styled.span`
  position: absolute;
  background-color: red;
  top: ${50 - mainLinesWidth / 2}%;
  left: 0;
  bottom: ${50 + mainLinesWidth / 2}%;
  right: 0;
  height: ${mainLinesWidth}%;
  z-index: 2;
`

const HorizontalWhiteLine = styled.span`
  position: absolute;
  background-color: white;
  top: ${50 - mainLinesWidth / 2 - mainLinesBorderWidth / 2}%;
  left: 0;
  bottom: ${50 + mainLinesWidth / 2 + mainLinesBorderWidth / 2}%;
  right: 0;
  height: ${mainLinesWidth + mainLinesBorderWidth}%;
  z-index: 1;
`

const VerticalRedLine = styled.span`
  position: absolute;
  background-color: red;
  top: 0;
  left: ${50 - mainLinesWidth / 2}%;
  bottom: 0;
  right: ${50 + mainLinesWidth / 2}%;
  width: ${mainLinesWidth}%;
  z-index: 2;
`

const VerticalWhiteLine = styled.span`
  position: absolute;
  background-color: white;
  top: 0;
  left: ${50 - mainLinesWidth / 2 - mainLinesBorderWidth / 2}%;
  bottom: 0;
  right: ${50 + mainLinesWidth / 2 + mainLinesBorderWidth / 2}%;
  width: ${mainLinesWidth + mainLinesBorderWidth}%;
  z-index: 1;
`

const RotatedHorizontalRedLine = styled(HorizontalRedLine)`
  transform: rotate(150deg);
  top: ${50 - rotatedLinesWidth / 2}%;
  left: -100%;
  bottom: ${50 + rotatedLinesWidth / 2}%;
  right: -100%;
  height: ${rotatedLinesWidth}%;
  z-index: 0;
`

const RotatedHorizontalWhiteLine = styled(HorizontalWhiteLine)`
  transform: rotate(150deg);
  top: ${50 - rotatedLinesWidth / 2 - rotatedLinesBorderWidth / 2}%;
  left: -100%;
  bottom: ${50 + rotatedLinesWidth / 2 + rotatedLinesBorderWidth / 2}%;
  right: -100%;
  height: ${rotatedLinesWidth + rotatedLinesBorderWidth}%;
  z-index: 0;
`

const RotatedVerticalRedLine = styled(VerticalRedLine)`
  transform: rotate(120deg);
  top: -100%;
  left: ${50 - rotatedLinesWidth / 2}%;
  bottom: -100%;
  right: ${50 + rotatedLinesWidth / 2}%;
  width: ${rotatedLinesWidth}%;
  z-index: 0;
`

const RotatedVerticalWhiteLine = styled(VerticalWhiteLine)`
  transform: rotate(120deg);
  top: -100%;
  left: ${50 - rotatedLinesWidth / 2 - rotatedLinesBorderWidth / 2}%;
  bottom: -100%;
  right: ${50 + rotatedLinesWidth / 2 + rotatedLinesBorderWidth / 2}%;
  width: ${rotatedLinesWidth + rotatedLinesBorderWidth}%;
  z-index: 0;
`

export default function FlagOfUnitedKingdom (props) {
  return <Container {...props}>
    <RotatedHorizontalWhiteLine/>
    <RotatedVerticalWhiteLine/>
    <RotatedHorizontalRedLine/>
    <RotatedVerticalRedLine/>
    <HorizontalWhiteLine/>
    <VerticalWhiteLine/>
    <HorizontalRedLine/>
    <VerticalRedLine/>
  </Container>
}
