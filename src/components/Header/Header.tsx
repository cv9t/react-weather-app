import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, AppBar, Box, Toolbar, Typography, Skeleton } from '@mui/material';
import { LocationSearchBar } from '..';
import { useFetch, useRecentLocations } from '../../hooks';
import { LocationType, WeatherDataType } from '../../types';
import { RecentLocationWidget } from '../RecentLocationWidget';
import { WeatherService } from '../../service';
import { StyledAppBar } from './Header.styled';

function Header() {
  const { recentLocations, saveRecentLocation } = useRecentLocations();
  const [recentLocationWeather, setRecentLocationWeather] = React.useState<
    WeatherDataType | undefined
  >(undefined);
  const [recentLocationWeatherFetch, isRecentLocationWeatherFetchLoading] = useFetch(async () => {
    const fetchedRecentLocationWeather = await WeatherService.getOneCallWeatherForecast(
      recentLocations[0].coords
    );
    setRecentLocationWeather(fetchedRecentLocationWeather);
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    recentLocationWeatherFetch();
  }, []);

  const handleSearch = (location: LocationType | string) => {
    if (typeof location !== 'string') {
      saveRecentLocation(location);
      navigate(`location/${location.placeId}`, { state: { location } });
    } else {
      navigate(`search-results/${location}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h5" mr={5}>
              React Weather App
            </Typography>

            {!recentLocationWeather || isRecentLocationWeatherFetchLoading ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={220}
                height={40}
                sx={{ borderRadius: '4px' }}
              />
            ) : (
              <RecentLocationWidget location={recentLocations[0]} weather={recentLocationWeather} />
            )}

            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <LocationSearchBar handleSearch={handleSearch} placeholder="Search City" />
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </Box>
  );
}

export { Header };
