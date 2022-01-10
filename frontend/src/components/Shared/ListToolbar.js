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
import { useHistory } from 'react-router';

import SearchIcon from '@mui/icons-material/Search';

import moment from 'moment';


const useStyles = makeStyles((theme) => {
    return {
        buttonBar: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        button: {
            marginLeft: theme.spacing(0.75),
            marginRight: theme.spacing(0.75)
        },
        box: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        },
        card: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        searchBar: {
            width: '60%',
        },
    }
});

const ListToolbar = ({ searchData, searchFilters, setFilteredData, setPage, routename = 'route', ...rest }) => {
    const styles = useStyles();
    const [searchValue, setSearchValue] = useState();

    const history = useHistory();

    useEffect(() => {
        setFilteredData(searchData)
    }, [searchData, setFilteredData]);

    useEffect(() => {

        /**
         * Filters the data and sets the filtered data using the callback function setFilteredData
         */
        const filter = () => {
            const filteredList = searchData.filter((item) => {
                let filtered = false;
                for (let field of searchFilters) {
                    let searchInValue = '';
                    for (let rowdatakey of field['rowdatakeys']) {
                        const separator = field['separator'] ? field['separator'] : '';
                        if (rowdatakey.includes('date'))
                            searchInValue += moment(item[rowdatakey])?.format('MMMM Do, YYYY') + separator;
                        else
                            searchInValue += item[rowdatakey] + separator;
                    }
                    filtered = filtered || searchInValue.toLowerCase().includes(searchValue?.toLowerCase());
                }
                return filtered;
            });

            setFilteredData(filteredList);
        }

        filter();
    }, [searchValue, searchData, searchFilters, setFilteredData]);

    const handleOnChange = (e) => {
        setSearchValue(e.target.value);
        setPage(0);
    };

    return (
        <Box {...rest}>
            <Box
                className={styles.buttonBar}
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
                    onClick={() => history.push({
                        pathname: '/add',
                        state: { routename: routename }
                    })}
                >
                    {'Add ' + routename}
                </Button>
            </Box>
            <Box className={styles.box}>
                <Card>
                    <CardContent className={styles.card}>
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
                                placeholder={'Search ' + routename}
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