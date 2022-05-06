import { styled, Tab } from '@mui/material'

export const LocationWeatherContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

export const StyledTab = styled(Tab)`
  min-width: auto;
  margin-right: 20px;
  padding: 0;
  letter-spacing: 1px;

  &:last-child {
    margin-right: 0;
  }
`

export const LoaderWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
