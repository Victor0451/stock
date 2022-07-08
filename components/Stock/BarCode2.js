import React from 'react'
import Code from 'react-jsbarcode';

const BarCode = ({
    codigo
}) => {
    return (
        <Code value={codigo} />
    )
}

export default BarCode