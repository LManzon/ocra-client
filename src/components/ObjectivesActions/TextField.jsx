import React from 'react';

export default function BasicTextFields() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            {/* <TextField id="standard-basic" label="Standard" /> */}
            <Input id="filled-basic" label="Filled" variant="filled" />
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
        </form>
    );
}