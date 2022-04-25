import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Typography, List } from '@mui/material';
import { usePlaces, useRecentLocations } from '../../hooks';
import { getLatLngByAddress } from '../../utils';
import { Container, LoaderWrapper, StyledListItem } from './SearchResults.styled';

function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();
  const { saveRecentLocation } = useRecentLocations();
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlaces();

  React.useEffect(() => {
    getPlacePredictions({ input: query as string });
  }, [query]);

  const handleClick = async (placePrediction: google.maps.places.AutocompletePrediction) => {
    const coords = await getLatLngByAddress(placePrediction.description);
    const location = {
      description: placePrediction.description,
      placeId: placePrediction.place_id,
      coords,
    };
    saveRecentLocation(location);
    navigate(`location/${location.placeId}`, { state: { location } });
  };

  if (isPlacePredictionsLoading) {
    return (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    );
  }

  return (
    <Container>
      {placePredictions.length > 0 ? (
        <>
          <Typography my={1} color="text.secondary">
            Found {placePredictions.length} locations for &quot;{query}&quot;
          </Typography>
          <List>
            {placePredictions.map((p) => (
              <StyledListItem key={p.description} onClick={() => handleClick(p)}>
                {p.description}
              </StyledListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <Typography variant="h4">No results found. 🤔</Typography>
          <Typography mt={1} color="text.secondary">
            Try to enter the correct city name
          </Typography>
        </>
      )}
    </Container>
  );
}

export { SearchResults };
