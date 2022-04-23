import React, { memo } from 'react';
import { CircularProgress, Typography, List } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationType } from '../../types';
import { Container, LoaderWrapper, StyledListItem } from './SearchResults.styled';

interface SearchResultsProps {
  isLoading: boolean;
  searchQuery: string;
  searchResults: LocationType[];
}

function SearchResults() {
  const { isLoading, searchResults, searchQuery } = useLocation().state as SearchResultsProps;
  const navigate = useNavigate();

  const handleClick = (value: string) => {
    navigate(`/location/${value}`);
  };

  if (isLoading) {
    return (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    );
  }

  return (
    <Container>
      {searchResults.length > 0 ? (
        <>
          <Typography my={1} color="text.secondary">
            Found {searchResults.length} locations for &quot;{searchQuery}&quot;
          </Typography>
          <List>
            {searchResults.map((result) => (
              <StyledListItem
                key={result.description}
                onClick={() => handleClick(result.description)}
              >
                {result.description}
              </StyledListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <Typography variant="h4">No results found.</Typography>
          <Typography mt={1} color="text.secondary">
            Try to enter the correct city name
          </Typography>
        </>
      )}
    </Container>
  );
}

const MemoizedSearchResults = memo(SearchResults);

export { MemoizedSearchResults as SearchResults };
