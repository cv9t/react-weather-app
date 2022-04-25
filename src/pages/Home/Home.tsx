import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Skeleton } from '@mui/material';
import { LocationType, WeatherDataType } from '../../types';
import { LocationSearchBar, RecentLocationWidget } from '../../components';
import { WeatherService } from '../../service';
import { useFetch, useRecentLocations } from '../../hooks';
import { Container, RecentLocationsContainer } from './Home.styled';

function Home() {
  const { recentLocations, saveRecentLocation } = useRecentLocations();
  const [recentLocationsWeather, setRecentLocationsWeather] = React.useState<WeatherDataType[]>([]);
  const [
    recentLocationsWeatherFetch,
    isRecentLocationsWeatherFetchLoading,
    isRecentLocationsWeatherFetchError,
  ] = useFetch(async () => {
    const promises = [];
    for (let i = 0; i < recentLocations.length; i += 1) {
      promises.push(WeatherService.getOneCallWeatherForecast(recentLocations[i].coords));
    }
    const fetchedRecentLocationsWeather = await Promise.all(promises);
    setRecentLocationsWeather(fetchedRecentLocationsWeather);
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   recentLocationsWeatherFetch();
  // }, [recentLocations]);

  React.useEffect(() => {
    if (isRecentLocationsWeatherFetchError) {
      enqueueSnackbar("Can't fetch recent locations weather", { variant: 'error' });
    }
  }, [isRecentLocationsWeatherFetchError]);

  const handleSearch = (location: LocationType | string) => {
    if (typeof location !== 'string') {
      saveRecentLocation(location);
      navigate(`location/${location.placeId}`, { state: { location } });
    } else {
      navigate(`search-results/${location}`);
    }
  };

  const renderRecentLocations = () => {
    if (isRecentLocationsWeatherFetchError) return null;

    if (isRecentLocationsWeatherFetchLoading) {
      return recentLocations.map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          animation="wave"
          width={220}
          height={40}
          sx={{ borderRadius: '4px' }}
        />
      ));
    }

    if (recentLocationsWeather.length === 0 || recentLocations.length === 0) return null;

    return recentLocations.map((location, idx) => (
      <RecentLocationWidget
        key={location.description}
        location={location}
        weather={recentLocationsWeather[idx]}
      />
    ));
  };

  return (
    <Container>
      <LocationSearchBar handleSearch={handleSearch} placeholder="Search City" />
      <RecentLocationsContainer>{renderRecentLocations()}</RecentLocationsContainer>
    </Container>
  );
}

export { Home };
