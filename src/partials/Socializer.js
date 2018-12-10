import React from 'react'



const Socializer = ( { srcSvg, srcPng } ) => (
    
    <div id = "socializer">

        <a 
            href = "https://www.instagram.com/sachahoechstetter/" 
            title = "follow sacha on instagram"
            target = "_blank"
            rel = "noopener noreferrer"
            >
            <div>
                <picture>
                    <source srcSet = { srcSvg } type = "image/svg+xml" />
                    <img src = { srcPng } alt = { "instagram.com/sachahoechstetter" } />
                </picture>
            </div>
        </a>

    </div>

)

export default Socializer
