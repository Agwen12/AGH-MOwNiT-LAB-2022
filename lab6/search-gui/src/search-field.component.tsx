import React from 'react';
import { TextField } from "@material-ui/core"

interface SearchFieldProps {
    onChange: (query: string) => void
}
export const SearchFieldComponent = ({ onChange }: SearchFieldProps): JSX.Element => {
    return <TextField
        style={{ width: '100%' }}
        label="Provide a query ..."
        variant="outlined"
        onChange={(e) => {
            onChange(e.target.value)
        }}
    />
}