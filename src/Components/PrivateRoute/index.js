import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({children, ...rest}){
    const jwt = localStorage.getItem("jwt")

    return (
        <Route {...rest}
            render={({location}) => 
                jwt ? (
                    children
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: {from: location}
                    }} />
                )
            }
        />
    )
}