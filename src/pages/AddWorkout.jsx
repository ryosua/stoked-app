import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import DateTimePicker from '../components/DateTimePicker'
import AddWorkoutMutation from '../graphql/AddWorkoutMutation'
import ViewWorkoutsQuery from '../graphql/ViewWorkoutsQuery'

const AddWorkout = () => {
    const [selectedDate, handleDateChange] = useState(new Date())
    const [title, handleTitleChange] = useState('')
    const [link, handleLinkChange] = useState('')
    const [addWorkout] = useMutation(AddWorkoutMutation, {
        update(cache, { data: { addWorkout } }) {
            const { workouts } = cache.readQuery({ query: ViewWorkoutsQuery })
            cache.writeQuery({
                query: AddWorkout,
                data: { workouts: workouts.concat(addWorkout) }
            })
        }
    })
    const handleAddWorkout = () => {
        addWorkout({ variables: { title, startTime: selectedDate.toISOString(), link } })
        handleTitleChange('')
        handleLinkChange('')
    }
    const handleTextFieldChange = handler => e => handler(e.target.value)

    return (
        <Grid container>
            <Grid item sm={false} md={3} />
            <Grid item sm={12} md={6}>
                <Box display="flex" flex={1} flexDirection="column" p={5}>
                    <Typography variant="h2">Create Workout</Typography>
                    <TextField label={'Title'} value={title} onChange={handleTextFieldChange(handleTitleChange)} />
                    <TextField label={'Link'} value={link} onChange={handleTextFieldChange(handleLinkChange)} />
                    <Box my={2}>
                        <DateTimePicker value={selectedDate} handleDateChange={handleDateChange} />
                    </Box>
                    <Button variant="outlined" onClick={handleAddWorkout} disabled={!title || !link}>
                        Create Workout
                    </Button>
                </Box>
            </Grid>
            <Grid item sm={false} md={3} />
        </Grid>
    )
}

export default AddWorkout
