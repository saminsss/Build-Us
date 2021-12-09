import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  makeStyles
} from '@material-ui/core';

import SearchIcon from '@mui/icons-material/Search';
import SortBox from './SortBox';

import moment from 'moment';


const useStyles = makeStyles((theme) => {
  return {
    button: {
      marginLeft: theme.spacing(0.75),
      marginRight: theme.spacing(0.75)
    },
    searchBox: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    searchCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    searchBar: {
      minWidth: '35%',
    },
    sortButtonBox: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    sortBox: {
      display: 'block',
      position: 'absolute',
      marginTop: theme.spacing(5),
      marginRight: theme.spacing(0.25),
      minWidth: 200
    }
  }
});

const ListToolbar = ({ searchIn, searchFilters, setList, setPage, button, placeholder, ...rest }) => {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState();
  const [sortBox, setSortBox] = useState(false);

  useEffect(() => {
    filter();
  }, [searchValue]);

  const filter = () => {
    const filteredList = searchIn.filter((item) => {
      let filtered = false;
      for (let key of searchFilters) {
        if (key.includes('date'))
          filtered = filtered || moment(item[key])?.format('MMMM Do, YYYY').toLowerCase().includes(searchValue?.toLowerCase());

        else
          filtered = filtered || item[key]?.toLowerCase().includes(searchValue?.toLowerCase());
      }
      return filtered;
    });

    setList(filteredList);
  }

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
    setPage(0);
  }

  const toggleSortBox = () => {
    setSortBox(!sortBox);
  }

  return (
    <Box {...rest}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button className={styles.button}>
          Import
        </Button>
        <Button className={styles.button}>
          Export
        </Button>
        <Button
          className={styles.button}
          color="secondary"
          variant="contained"
        >
          {button ? button : "Add"}
        </Button>
      </Box>
      <Box className={styles.searchBox}>
        <Card>
          <CardContent className={styles.searchCard}>
            <Box className={styles.searchBar}>
              <TextField
                fullWidth
                value={searchValue}
                onChange={e => handleOnChange(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                placeholder={placeholder}
                variant="outlined"
              />
            </Box>
            <Box className={styles.sortButtonBox}>
              <Button
                variant='outlined'
                onClick={() => toggleSortBox()}
              >
                <SearchIcon />
                Sort
              </Button>
              {sortBox && <SortBox className={styles.sortBox} />}
            </Box>


          </CardContent>
        </Card>
      </Box>
    </Box>
  )
};

export default ListToolbar;