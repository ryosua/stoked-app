import React from 'react'
import { Route } from 'react-router-dom'
import Box from '@material-ui/core/Box'

import AuthenticatedRoute from '../AuthenticatedRoute'
import NavBar from './NavBar'
import AddWorkout from '../../pages/AddWorkout'
import Landing from '../../pages/Landing'
import ViewWorkouts from '../../pages/ViewWorkouts'
import { addWorkout, home, workouts } from '../../constants/routes'

const MainNavigation = () => (
    <>
        <header>
            <NavBar />
        </header>
        <Box display="flex" flexDirection="column" mt={2}>
            <AuthenticatedRoute exact path={addWorkout} component={AddWorkout} />
            <Route exact path={home} component={Landing} />
            <Route exact path={workouts} component={ViewWorkouts} />
        </Box>
    </>
)

export default MainNavigation
