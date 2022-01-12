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

const ListToolbar = ({ searchdata, searchfilters, setfiltereddata, setpage, routename = 'route', ...rest }) => {
    const styles = useStyles();
    const [searchValue, setSearchValue] = useState();

    const history = useHistory();

    useEffect(() => {
        setfiltereddata(searchdata)
    }, [searchdata, setfiltereddata]);

    useEffect(() => {
        /**
         * Filters the data and sets the filtered data using the callback function setfiltereddata
         */
        const filter = () => {
            const filteredList = searchdata.filter((item) => {
                let alreadySearchedKeys = [];
                let filtered = false;
                for (let field of searchfilters) {
                    if (alreadySearchedKeys.includes(...(field.rowdatakeys))) continue;

                    alreadySearchedKeys.push(...(field.rowdatakeys))
                    let searchInValue = '';

                    for (let rowdatakey of field.rowdatakeys) {
                        const separator = field.rowdataseparator ? field.rowdataseparator : '';
                        if (rowdatakey.includes('date'))
                            searchInValue += moment(item[rowdatakey])?.format('MMMM Do, YYYY') + separator;
                        else
                            searchInValue += item[rowdatakey] + separator;
                    }
                    filtered = filtered || searchInValue.toLowerCase().includes(searchValue?.toLowerCase());
                }
                return filtered;
            });

            setfiltereddata(filteredList);
        }

        filter();
    }, [searchValue, searchdata, setfiltereddata]);

    const handleOnChange = (e) => {
        setSearchValue(e.target.value);
        setpage(0);
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