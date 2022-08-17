import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div>
        <TextField
                label='title'
                helperText={error}
                variant="outlined"
                size='small'
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
        />
        <IconButton onClick={addItem}>
            <AddRoundedIcon />
        </IconButton >
    </div>
}













