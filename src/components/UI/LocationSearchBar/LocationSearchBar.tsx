import React from 'react'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useAutocomplete, ListItemText, ListItem, createFilterOptions } from '@mui/material'
import {
  StyledInput,
  StyledList,
  StyledListItem,
  LocationSearchBarWrapper,
} from './LocationSearchBar.styled'
import { geocodeByAddress, getLatLng } from '../../../utils'
import { LocationType } from '../../../types'

interface LocationSearchBarProps {
  onSelect: (location: LocationType) => void
  placeholder?: string
}

const filter = createFilterOptions<google.maps.places.AutocompletePrediction>()

function LocationSearchBar({ onSelect, placeholder }: LocationSearchBarProps) {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: process.env.GOOGLE_PLACES_AUTOCOMPLETE_API_KEY,
    options: {
      input: '',
      types: ['(cities)'],
    },
  })
  const {
    setAnchorEl,
    focused,
    inputValue,
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    value: null,
    blurOnSelect: true,
    onInputChange: (_, value) => {
      if (value !== '') {
        getPlacePredictions({ input: value })
      }
    },
    onChange: async (_, value) => {
      if (!value) {
        return
      }

      const results = await geocodeByAddress(value.description)
      const latLng = await getLatLng(results[0])
      const location: LocationType = {
        description: value.description,
        placeId: value.place_id,
        coords: latLng,
      }
      onSelect(location)
    },
    options: placePredictions,
    getOptionLabel: (option) => option.description,
    filterOptions: (options, params) => {
      if (params.inputValue !== '') {
        const filtered = filter(options, params)
        return filtered
      }

      return []
    },
  })

  const renderOptions = () => {
    if ((inputValue && !groupedOptions.length) || isPlacePredictionsLoading) {
      return (
        <ListItem sx={{ padding: '6px 16px' }}>
          <ListItemText
            primary={
              isPlacePredictionsLoading
                ? 'Searching'
                : 'No results. Enter the correct name of the city'
            }
            primaryTypographyProps={{ color: 'text.secondary' }}
          />
        </ListItem>
      )
    }

    return (groupedOptions as typeof placePredictions).map((option, index) => (
      <StyledListItem {...getOptionProps({ option, index })}>
        <ListItemText primary={option.description} />
      </StyledListItem>
    ))
  }

  return (
    <LocationSearchBarWrapper>
      <div {...getRootProps()}>
        <StyledInput
          inputProps={{
            ...getInputProps(),
          }}
          ref={setAnchorEl}
          placeholder={placeholder}
        />
      </div>
      {focused && <StyledList {...getListboxProps()}>{renderOptions()}</StyledList>}
    </LocationSearchBarWrapper>
  )
}

export { LocationSearchBar }
