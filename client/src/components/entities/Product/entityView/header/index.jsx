import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {Link,useRouteMatch} from 'react-router-dom'
import React from 'react';
function ProductHeader({ title, toggleDialog }) {
    const match = useRouteMatch()
    return (
        < Box pt={2} pb={1} display="flex" justifyContent="space-between" alignItems="center" >
            <Typography variant="h5">{title}</Typography>
            {title === 'Invoice' ?
                (<Button color="primary" component={Link} to={`${match.path}/NewInvoice`} variant="contained" size="small">ADD</Button>)
                :
                (<Button color="primary" variant="contained" onClick={toggleDialog} size="small">ADD</Button>)
            }

        </Box >
    )
}

export default React.memo(ProductHeader)