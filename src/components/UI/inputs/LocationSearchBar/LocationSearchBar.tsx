import React from 'react'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useAutocomplete, ListItemText, ListItem, createFilterOptions } from '@mui/material'
import {
  StyledInput,
  StyledList,
  StyledListItem,
  LocationSearchBarWrapper,
} from './LocationSearchBar.styled'
import { LocationType } from '../../../../types'

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
    inputValue,
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    value: null,
    blurOnSelect: true,
    clearOnEscape: true,
    onInputChange: (_, value, reason) => {
      if (value !== '' && reason !== 'reset') {
        getPlacePredictions({ input: value })
      }
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
    onChange: (_, value) => {
      if (!value) return

      const location: LocationType = {
        description: value.description,
        placeId: value.place_id,
      }

      onSelect(location)
    },
  })

  return (
    <LocationSearchBarWrapper>
      <div {...getRootProps()}>
        <StyledInput
          inputProps={{
            ...getInputProps(),
          }}
          placeholder={placeholder}
        />
      </div>
      <StyledList {...getListboxProps()}>
        {(inputValue && !groupedOptions.length) || isPlacePredictionsLoading ? (
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
        ) : (
          (groupedOptions as typeof placePredictions).map((option, index) => (
            <StyledListItem {...getOptionProps({ option, index })}>
              <ListItemText primary={option.description} />
            </StyledListItem>
          ))
        )}
      </StyledList>
    </LocationSearchBarWrapper>
  )
}

export { LocationSearchBar }
