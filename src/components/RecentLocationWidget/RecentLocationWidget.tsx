import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import { WeatherDataType, LocationType, WeatherAlertType } from '../../types';
import { firstLetterUpperCase } from '../../utils';
import { useRecentLocations } from '../../hooks';
import { RecentLocationWidgetWrapper, LocationAlert } from './RecentLocationWidget.styled';

interface RecentLocationWidgetProps {
  location: LocationType;
  weather: WeatherDataType;
}

function RecentLocationWidget({ location, weather }: RecentLocationWidgetProps) {
  const { saveRecentLocation } = useRecentLocations();
  const navigate = useNavigate();

  const handleClick = () => {
    saveRecentLocation(location);
    navigate(`/location/${location.placeId}`, { state: { location } });
  };

  const getUniqueAlerts = (alerts: WeatherAlertType[]) => {
    const res: WeatherAlertType[] = [];
    for (let i = 0; i < alerts.length; i += 1) {
      const alert = alerts[i];
      if (!res.find((a) => JSON.stringify(a.tags) === JSON.stringify(alert.tags))) {
        res.push(alert);
      }
    }
    return res;
  };

  const renderLocationAlert = () => {
    const uniqueAlerts = getUniqueAlerts(weather.alerts);

    return (
      <Tooltip
        placement="top"
        title={
          <List sx={{ padding: 0 }}>
            {uniqueAlerts.map((alert) => (
              <ListItem
                key={alert.event}
                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
              >
                <ListItemText
                  primary={`Warning for ${alert.event}`}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', mb: 0.25 }}
                  secondary={
                    <>
                      <span>Start: {moment(alert.start, 'X').format('ddd, MMMM DD, h:mm a')}</span>
                      <br />
                      <span>End: {moment(alert.end, 'X').format('ddd, MMMM DD, h:mm a')}</span>
                    </>
                  }
                  secondaryTypographyProps={{ color: 'rgba(255,255,255,.5)' }}
                />
              </ListItem>
            ))}
          </List>
        }
      >
        <LocationAlert>{uniqueAlerts.length}</LocationAlert>
      </Tooltip>
    );
  };

  return (
    <RecentLocationWidgetWrapper elevation={3} onClick={() => handleClick()}>
      {weather.alerts && weather.alerts.length > 0 && renderLocationAlert()}
      <Typography component="span" mr={1.5}>
        {location.description}
      </Typography>
      <Tooltip title={firstLetterUpperCase(weather.current.weather[0].description)}>
        <img
          src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
          height={50}
          width={50}
          alt={weather.current.weather[0].main}
        />
      </Tooltip>
      <Typography component="span" ml={0.5}>
        {Math.round(weather.current.temp)}°C
      </Typography>
    </RecentLocationWidgetWrapper>
  );
}

const MemoizedRecentLocationWidget = React.memo(RecentLocationWidget);

export { MemoizedRecentLocationWidget as RecentLocationWidget };
