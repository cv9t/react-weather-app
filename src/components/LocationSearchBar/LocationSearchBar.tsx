import React, { memo, useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { useAutocomplete, createFilterOptions, ListItemText } from '@mui/material';
import {
  LocationSearchBarWrapper,
  StyledInput,
  StyledList,
  StyledListItem,
} from './LocationSearchBar.styled';
import { LocationType } from '../../types';

const filter = createFilterOptions<google.maps.places.AutocompletePrediction>();
interface LocationSearchBarProps {
  handleSearch: (value: LocationType | string) => void;
  handleSearchResultsReceive: (value: LocationType[]) => void;
  handleLoading: (value: boolean) => void;
  placeholder?: string;
}

function LocationSearchBar({
  handleSearch,
  handleSearchResultsReceive,
  handleLoading,
  placeholder,
}: LocationSearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [optionSelected, setOptionSelected] = useState(false);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: process.env.GOOGLE_PLACES_AUTOCOMPLETE_API_KEY,
    options: {
      input: '',
      types: ['(cities)'],
    },
  });
  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
    useAutocomplete({
      freeSolo: true,
      selectOnFocus: true,
      blurOnSelect: true,
      inputValue,
      options: placePredictions as LocationType[],
      isOptionEqualToValue: (option, value) => option.place_id === value.place_id,
      onInputChange: (_, value: string, reason) => {
        if (reason === 'reset') {
          setInputValue('');
        } else {
          getPlacePredictions({ input: value });
          setInputValue(value);
        }
      },
      onChange: (_, value) => {
        if (!value) return;

        if (typeof value === 'string') {
          handleSearch(value);
          handleLoading(true);
          setOptionSelected(false);
        } else {
          handleSearch(value);
          setOptionSelected(true);
        }
      },
      getOptionLabel: (option) => {
        if (typeof option === 'string') {
          return option;
        }

        return option.description;
      },
      filterOptions: (options, params) => {
        if (params.inputValue !== '') {
          const filtered = filter(options, params);

          return filtered;
        }

        return [];
      },
    });

  useEffect(() => {
    if (!isPlacePredictionsLoading && !optionSelected) {
      handleSearchResultsReceive(placePredictions);
      handleLoading(false);
      setOptionSelected(true);
    }
  }, [placePredictions, optionSelected]);

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
      {groupedOptions.length > 0 ? (
        <StyledList {...getListboxProps()}>
          {(groupedOptions as typeof placePredictions).map((option, index) => (
            <StyledListItem {...getOptionProps({ option, index })}>
              <ListItemText primary={option.description} />
            </StyledListItem>
          ))}
        </StyledList>
      ) : null}
    </LocationSearchBarWrapper>
  );
}

const MemoizedLocationSearchBar = memo(LocationSearchBar);

export { MemoizedLocationSearchBar as LocationSearchBar };
