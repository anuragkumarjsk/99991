import React from 'react'
import './index.css'
function Loading() {
    

    return (
        <div className="Loading">
            <div class="d-flex align-items-center">
            <strong>Loading...{'  '}</strong>
            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
        </div>
    )
}

export default Loading
