import React from 'react';
import { Autocomplete, createFilterOptions } from '@mui/material';
import { LocationType } from '../../types';
import { getLatLngByAddress } from '../../utils';
import { usePlaces } from '../../hooks';
import { StyledAutocompletePopper, StyledInput } from './LocationSearchBar.styled';

interface PopperComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const filter = createFilterOptions<google.maps.places.AutocompletePrediction>();

interface LocationSearchBarProps {
  handleSearch: (location: LocationType | string) => void;
  placeholder?: string;
}

interface LocationOptionType extends google.maps.places.AutocompletePrediction {
  inputValue?: string;
}

function LocationSearchBar({ handleSearch, placeholder }: LocationSearchBarProps) {
  const { placePredictions, getPlacePredictions } = usePlaces();

  return (
    <Autocomplete
      value={null}
      autoHighlight
      blurOnSelect
      selectOnFocus
      clearOnBlur
      freeSolo
      fullWidth
      options={placePredictions as LocationOptionType[]}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }

        if (option.inputValue) {
          return option.inputValue;
        }

        return option.description;
      }}
      PopperComponent={PopperComponent}
      isOptionEqualToValue={(option, value) => option.place_id === value.place_id}
      onInputChange={(_, value, reason) => {
        if (reason !== 'reset') {
          getPlacePredictions({ input: value });
        }
      }}
      filterOptions={(options, params) => {
        if (params.inputValue !== '') {
          const filtered = filter(options, params);
          filtered.unshift({
            inputValue: params.inputValue,
            description: `Search "${params.inputValue}"`,
          } as LocationOptionType);

          return filtered;
        }

        return [];
      }}
      onChange={async (_, value) => {
        if (!value) return;

        if (typeof value === 'string') {
          handleSearch(value);
        } else if (value.inputValue) {
          handleSearch(value.inputValue);
        } else {
          const coords = await getLatLngByAddress(value.description);
          handleSearch({
            description: value.description,
            placeId: value.place_id,
            coords,
          });
        }
      }}
      renderInput={(params) => (
        <StyledInput
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          placeholder={placeholder}
        />
      )}
      renderOption={(props, option) => <li {...props}>{option.description}</li>}
    />
  );
}

export { LocationSearchBar };

// import React from 'react';
// import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
// import {
//   InputBase,
//   styled,
//   List,
//   ListItem,
//   useAutocomplete,
//   createFilterOptions,
//   ListItemText,
// } from '@mui/material';
// import { geocodeByAddress, getLatLng } from '../utils';
// import { CoordsType, LocationType } from '../types';

// export const LocationSearchBarWrapper = styled('div')`
//   position: relative;
//   width: 100%;
// `;

// export const StyledInput = styled(InputBase)(({ theme }) => ({
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: '8px 12px',
//     borderRadius: 4,
//     backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fff',
//     border: '1px solid #d9d9d9',
//     transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
//     '&:focus': {
//       boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
//       borderColor: theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff',
//     },
//   },
// }));

// export const StyledList = styled(List)(({ theme }) => ({
//   position: 'absolute',
//   width: '100%',
//   margin: '8px 0 0',
//   padding: 0,
//   borderRadius: 4,
//   backgroundColor: theme.palette.mode === 'dark' ? '#141414' : '#fff',
//   zIndex: 1000,
//   boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
// }));

// export const StyledListItem = styled(ListItem)(({ theme }) => ({
//   padding: '6px 16px',
//   borderBottom: '1px solid #d9d9d9',
//   transition: theme.transitions.create(['background-color', 'color'], { duration: 50 }),
//   '&:hover': {
//     cursor: 'pointer',
//     backgroundColor: 'rgba(0, 0, 0, 0.03) !important',
//   },
//   '&:last-child': {
//     borderBottom: '1px solid transparent',
//   },
//   '&.Mui-focusVisible': {
//     color: theme.palette.primary.main,
//     backgroundColor: 'transparent',
//   },
// }));

// const filter = createFilterOptions<google.maps.places.AutocompletePrediction>();

// interface LocationSearchBarProps {
//   handleSearch: (value: LocationType | string) => void;
//   placeholder?: string;
// }

// function LocationSearchBar({ handleSearch, placeholder }: LocationSearchBarProps) {
//   const [optionSelected, setOptionSelected] = React.useState(false);
//   const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
//     apiKey: process.env.GOOGLE_PLACES_AUTOCOMPLETE_API_KEY,
//     options: {
//       input: '',
//       types: ['(cities)'],
//     },
//   });
//   const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
//     useAutocomplete({
//       value: null,
//       freeSolo: true,
//       selectOnFocus: true,
//       blurOnSelect: true,
//       clearOnBlur: true,
//       options: placePredictions,
//       isOptionEqualToValue: (option, value) => option.place_id === value.place_id,
//       onInputChange: (_, value: string, reason) => {
//         if (reason !== 'reset') {
//           getPlacePredictions({ input: value });
//         }
//       },
//       onChange: async (_, value) => {
//         if (!value) return;

//         if (typeof value === 'string') {
//           handleSearch(value);
//           setOptionSelected(false);
//         } else {
//           const location = await geocodeByAddress(value.description);
//           const coords: CoordsType = await getLatLng(location[0]);
//           handleSearch({
//             description: value.description,
//             placeId: value.place_id,
//             coords,
//           });
//           setOptionSelected(true);
//         }
//       },
//       getOptionLabel: (option) => {
//         if (typeof option === 'string') {
//           return option;
//         }

//         return option.description;
//       },
//       filterOptions: (options, params) => {
//         if (params.inputValue !== '') {
//           const filtered = filter(options, params);
//           return filtered;
//         }
//         return [];
//       },
//     });

//   return (
//     <LocationSearchBarWrapper>
//       <div {...getRootProps()}>
//         <StyledInput
//           inputProps={{
//             ...getInputProps(),
//           }}
//           placeholder={placeholder}
//         />
//       </div>
//       {groupedOptions.length > 0 ? (
//         <StyledList {...getListboxProps()}>
//           {(groupedOptions as typeof placePredictions).map((option, index) => (
//             <StyledListItem {...getOptionProps({ option, index })}>
//               <ListItemText primary={option.description} />
//             </StyledListItem>
//           ))}
//         </StyledList>
//       ) : null}
//     </LocationSearchBarWrapper>
//   );
// }

// export { LocationSearchBar };

// import React, { memo, useEffect, useState } from 'react';
// import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
// import {
//   InputBase,
//   styled,
//   List,
//   ListItem,
//   useAutocomplete,
//   createFilterOptions,
//   ListItemText,
//   ListItemIcon,
// } from '@mui/material';
// import { LocationType } from '../types';

// export const LocationSearchBarWrapper = styled('div')`
//   position: relative;
//   width: 100%;
// `;

// export const StyledInput = styled(InputBase)(({ theme }) => ({
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: '8px 12px',
//     borderRadius: 4,
//     backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fff',
//     border: '1px solid #d9d9d9',
//     transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
//     '&:focus': {
//       boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
//       borderColor: theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff',
//     },
//   },
// }));

// export const StyledList = styled(List)(({ theme }) => ({
//   position: 'absolute',
//   width: '100%',
//   margin: '8px 0 0',
//   padding: 0,
//   borderRadius: 4,
//   backgroundColor: theme.palette.mode === 'dark' ? '#141414' : '#fff',
//   zIndex: 1000,
//   boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
// }));

// export const StyledListItem = styled(ListItem)(({ theme }) => ({
//   padding: '6px 16px',
//   borderBottom: '1px solid #d9d9d9',
//   transition: theme.transitions.create(['background-color', 'color'], { duration: 50 }),
//   '&:hover': {
//     cursor: 'pointer',
//     backgroundColor: 'rgba(0, 0, 0, 0.03) !important',
//   },
//   '&:last-child': {
//     borderBottom: '1px solid transparent',
//   },
//   '&.Mui-focusVisible': {
//     color: theme.palette.primary.main,
//     backgroundColor: 'transparent',
//   },
// }));

// const filter = createFilterOptions<google.maps.places.AutocompletePrediction>();
// interface LocationSearchBarProps {
//   handleSearch: (value: LocationType | string) => void;
//   : (value: LocationType[]) => void;
//   : (value: boolean) => void;
//   placeholder?: string;
// }

// function LocationSearchBar({
//   handleSearch,
//   ,
//   ,
//   placeholder,
// }: LocationSearchBarProps) {
// const [optionSelected, setOptionSelected] = useState(false);
// const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
//   apiKey: process.env.GOOGLE_PLACES_AUTOCOMPLETE_API_KEY,
//   options: {
//     input: '',
//     types: ['(cities)'],
//   },
// });
// const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
//   useAutocomplete({
//     value: null,
//     freeSolo: true,
//     selectOnFocus: true,
//     blurOnSelect: true,
//     options: placePredictions as LocationType[],
//     isOptionEqualToValue: (option, value) => option.place_id === value.place_id,
//     onInputChange: (_, value: string, reason) => {
//       if (reason !== 'reset') {
//         getPlacePredictions({ input: value });
//       }
//     },
//     onChange: (_, value) => {
//       if (!value || typeof value === 'string') return;

//       if (typeof value === 'string') {
//         handleSearch(value);
//         (true);
//         setOptionSelected(false);
//       } else {
//         handleSearch(value);
//         setOptionSelected(true);
//       }
//     },
//     getOptionLabel: (option) => {
//       if (typeof option === 'string') {
//         return option;
//       }

//       if (option.inputValue) {
//         return option.inputValue;
//       }

//       return option.description;
//     },
//     filterOptions: (options, params) => {
//       if (params.inputValue !== '') {
//         const filtered = filter(options, params);

//         return filtered;
//       }

//       return [];
//     },
//   });

// const handleUseCurrentLocation = async () => {
//   const location = await getCurrentLocation();
//   // anchorEl?.blur();
//   // console.log(location, anchorEl);
// };

// useEffect(() => {
//   if (!isPlacePredictionsLoading && !optionSelected) {
//     (placePredictions);
//     (false);
//     setOptionSelected(true);
//   }
// }, [placePredictions, optionSelected]);

// return (
//   <LocationSearchBarWrapper>
//     <div {...getRootProps()}>
//       <StyledInput
//         inputProps={{
//           ...getInputProps(),
//         }}
//         placeholder={placeholder}
//       />
//     </div>

//     {/* {groupedOptions.length > 0 ? (
//       <StyledList {...getListboxProps()}>
//         <div>hello</div>
//         {(groupedOptions as typeof placePredictions).map((option, index) => (
//           <StyledListItem {...getOptionProps({ option, index })}>
//             <ListItemText primary={option.description} />
//           </StyledListItem>
//         ))}
//       </StyledList>
//     ) : null} */}
//   </LocationSearchBarWrapper>
// );
// }

// const MemoizedLocationSearchBar = memo(LocationSearchBar);

// export { MemoizedLocationSearchBar as LocationSearchBar };

// // {focused && (
// //   <StyledList {...getListboxProps()}>
// //     {/* <StyledListItem onClick={() => handleUseCurrentLocation()}>
// //       <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
// //         <LocationOnIcon />
// //       </ListItemIcon>
// //       <ListItemText primary="Use Current Location" />
// //     </StyledListItem> */}
// //     {(groupedOptions as typeof placePredictions).map((option, index) => (
// //       <StyledListItem {...getOptionProps({ option, index })}>
// //         <ListItemText primary={option.description} />
// //       </StyledListItem>
// //     ))}
// //   </StyledList>
// // )}
