import React from 'react'

import './productcard.css'
export default function ProductCard(props) {
    return (
        <div className="card_outer">
                <img className="cls_img" src={props.img_src} alt={props.img_name}/>
                <div className="image_title">{props.img_name}</div>
        </div>
    )
}
