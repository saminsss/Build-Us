import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';



const useStyles = makeStyles((theme) => {
  return {
    button: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    }
  }
});

const ListToolbar = (props) => {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    filter();
  }, [searchValue]);

  const filter = () => {
    const filteredList = props.searchIn.filter((item) => {
      return item.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.firstname?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.lastname?.toLowerCase().includes(searchValue.toLowerCase());
    });

    props.setList(filteredList);
  }

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
    props.setPage(0);
  }

  return (
    <Box {...props}>
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
          {props.button ? props.button : "Add"}
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                value={searchValue}
                onChange={e => handleOnChange(e)}
                InputProps={{
                  startAdornment: <SvgIcon color='secondary' />
                }}
                placeholder={props.placeholder}
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
};

export default ListToolbar;