import React, { SyntheticEvent, useState } from 'react';
import { Autocomplete, InputBase, styled, Box } from '@mui/material';

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #d9d9d9',
    width: '100%',
    padding: '8px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow'], {
      delay: 0,
    }),
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&:focus': {
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Description = styled('span')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#8b949e' : '#8b949e',
  marginLeft: 10,
  fontSize: 12,
  textTransform: 'uppercase',
}));

interface SearchBarProps<T> {
  options: T[];
  onSearch: (newValue: string) => void;
  maxOptions?: number;
  maxRecentOptions?: number;
  getOptionLabel?: (option: T) => string;
  getDescriptionLabel?: (option: T) => string;
  placeholder?: string;
}

function SearchBar<T>({
  options,
  onSearch,
  maxOptions = 5,
  maxRecentOptions = 5,
  // @ts-ignore
  getOptionLabel = (option) => option,
  // @ts-ignore
  getDescriptionLabel = (option) => option.description ?? '',
  placeholder,
}: SearchBarProps<T>) {
  const [recentOptions, setRecentOptions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line arrow-body-style
  const getOptionLabelDependsOnType = (option: T | string) => {
    return typeof option === 'string' ? option : getOptionLabel(option);
  };

  const filterOptions = (options: T[]) => {
    if (!inputValue) return recentOptions;

    return options
      .filter((option: T) =>
        getOptionLabel(option).toLowerCase().startsWith(inputValue.toLowerCase())
      )
      .slice(0, maxOptions);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (_: SyntheticEvent<Element, Event>, newValue: string | T | null) => {
    if (!newValue) return;

    if (typeof newValue !== 'string' && options.includes(newValue)) {
      const newValueIdx = recentOptions.indexOf(newValue);

      if (newValueIdx !== -1) {
        setRecentOptions((rOptions) => [
          newValue,
          ...rOptions.slice(0, newValueIdx),
          ...rOptions.slice(newValueIdx + 1, maxRecentOptions),
        ]);
      } else {
        setRecentOptions((rOptions) => [newValue, ...rOptions.slice(0, maxRecentOptions - 1)]);
      }
    }

    onSearch(getOptionLabelDependsOnType(newValue));
  };

  const handleInputChange = (_: SyntheticEvent<Element, Event>, newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <Autocomplete
      selectOnFocus
      blurOnSelect
      freeSolo
      open={open}
      inputValue={inputValue}
      options={options}
      onOpen={handleOpen}
      groupBy={() => (inputValue.length === 0 ? 'Recent' : '')}
      onClose={handleClose}
      onChange={handleChange}
      onInputChange={handleInputChange}
      getOptionLabel={(option) => (typeof option === 'string' ? option : getOptionLabel(option))}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <StyledInput
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          placeholder={placeholder}
        />
      )}
      renderOption={(props, option: T) => (
        <Box
          {...props}
          component="li"
          sx={{
            flexGrow: 1,
          }}
          key={getDescriptionLabel(option) + getOptionLabelDependsOnType(option)}
        >
          {typeof option === 'string' ? option : getOptionLabelDependsOnType(option)}
          <Description>{getDescriptionLabel(option)}</Description>
        </Box>
      )}
    />
  );
}

export { SearchBar };
