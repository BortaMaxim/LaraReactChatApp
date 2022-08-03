import React from 'react';
import ReactDOM from 'react-dom';

function RootApp() {
    return (
        <div>
            <h1>Hello Chat!!!</h1>
        </div>
    );
}

export default RootApp;

if (document.getElementById('root')) {
    ReactDOM.render(<RootApp />, document.getElementById('root'));
}
