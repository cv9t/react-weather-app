import React, { FC } from 'react';
import { InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: FC = () => (
  <Paper component="form" sx={{ display: 'flex', alignItems: 'center', p: 0.5 }}>
    <IconButton type="submit">
      <SearchIcon />
    </IconButton>
    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search City" />
  </Paper>
);

export { SearchBar };
