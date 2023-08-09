import React from 'react'
import { useLocation } from 'react-router'
import { SuspenseLoad } from '../../entities'
import CheckA from './CheckA'

interface ISuspenseLoadCheckA {
    children: React.ReactNode;
}


const SuspenseLoadCheckA: React.FC<ISuspenseLoadCheckA> = ({ children }) => {
    const location = useLocation()
    return (
        <SuspenseLoad>
            <CheckA location={location}>{children}</CheckA>
        </SuspenseLoad>
    )
}

export default SuspenseLoadCheckA
