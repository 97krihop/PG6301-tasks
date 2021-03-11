import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div>
            <h1>hello welcome to quiz game</h1>
            <Link to={'/match'}>
                <button>start game</button>
            </Link>
        </div>
    );
}
