import React, { memo, useState } from 'react';
import { ListItemText, useAutocomplete, createFilterOptions } from '@mui/material';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import {
  LocationSearchBarWrapper,
  StyledInput,
  StyledList,
  StyledListItem,
} from './LocationSearchBar.styled';
import { LocationType } from '../../types';

const filter = createFilterOptions<LocationType>();

interface LocationSearchBarProps {
  value: LocationType | null;
  onSearch: (value: LocationType) => void;
  cleanOnSearch?: boolean;
  placeholder?: string;
}

function LocationSearchBar({
  value,
  onSearch,
  placeholder,
  cleanOnSearch = false,
}: LocationSearchBarProps) {
  const [selected, setSelected] = useState(false);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: process.env.GOOGLE_PLACES_AUTOCOMPLETE_API_KEY,
    options: {
      input: '',
      types: ['(cities)'],
    },
    debounce: 200,
  });
  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
    useAutocomplete({
      value,
      autoHighlight: true,
      selectOnFocus: true,
      blurOnSelect: true,
      freeSolo: true,
      clearOnBlur: cleanOnSearch,
      options: placePredictions as LocationType[],
      filterOptions: (options, params) => {
        const filtered = filter(options, params);

        if (!isPlacePredictionsLoading) {
          if (params.inputValue !== '' && filtered.length === 0 && !isPlacePredictionsLoading) {
            filtered.push({
              inputValue: params.inputValue,
              description: `Search for "${params.inputValue}"`,
              place_id: '',
            } as LocationType);
          }

          return filtered;
        }

        return [];
      },
      getOptionLabel: (option) => {
        if (typeof option === 'string') {
          return option;
        }

        if (option.inputValue) {
          return option.inputValue;
        }

        return option.description;
      },
      isOptionEqualToValue: (option, value) => option.place_id === value.place_id,
      onInputChange: (_, value: string) => {
        getPlacePredictions({ input: value });
        if (selected) {
          setSelected(false);
        }
      },
      onChange: (_, value) => {
        if (typeof value !== 'string' && value) {
          onSearch({ description: value.inputValue || value.description } as LocationType);
        } else if (value) {
          onSearch({ description: value } as LocationType);
        }

        setSelected(true);
      },
    });

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
      {!selected && isPlacePredictionsLoading && (
        <StyledList>
          <StyledListItem>
            <ListItemText primary="Loading..." />
          </StyledListItem>
        </StyledList>
      )}
      {groupedOptions.length > 0 && (
        <StyledList {...getListboxProps()}>
          {(groupedOptions as typeof placePredictions).map((option, index) => (
            <StyledListItem {...getOptionProps({ option, index })}>
              <ListItemText primary={option.description} />
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </LocationSearchBarWrapper>
  );
}

const MemoizedLocationSearchBar = memo(LocationSearchBar);

export { MemoizedLocationSearchBar as LocationSearchBar };
