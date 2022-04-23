import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LocationSearchBar } from '../../components/LocationSearchBar';
import { LocationType } from '../../types';
import { SearchResults } from '../SearchResults';
import { Weather } from '../Weather';
import { MainContent } from './Home.styled';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value: LocationType | string) => {
    if (typeof value !== 'string') {
      navigate(`location/${value.description}`);
    } else {
      setSearchQuery(value);
    }
  };

  const handleSearchResultsReceive = (value: LocationType[]) => {
    setSearchResults(value);
  };

  const handleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  useEffect(() => {
    if (searchQuery !== '') {
      navigate(`search-results/${searchQuery}`, {
        state: { isLoading, searchResults, searchQuery },
      });
    }
  }, [searchResults, searchQuery]);

  return (
    <MainContent maxWidth="md" sx={{ py: 1 }}>
      <LocationSearchBar
        handleSearch={handleSearch}
        handleSearchResultsReceive={handleSearchResultsReceive}
        handleLoading={handleLoading}
        placeholder="Search City"
      />

      <Routes>
        <Route path="location/:location" element={<Weather />} />
        <Route path="search-results/:query" element={<SearchResults />} />
      </Routes>
    </MainContent>
  );
}

export { Home };
