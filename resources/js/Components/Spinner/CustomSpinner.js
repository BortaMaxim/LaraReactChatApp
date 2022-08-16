import React from 'react';

export const CustomSpinner = ({text}) => (
    <div className={`spinner-border text-${text}`} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
);
