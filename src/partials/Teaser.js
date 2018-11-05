import React from 'react'
import { NavLink } from 'react-router-dom'

import ImageLoader from '../handler/ImageLoader'



const Teaser = ( { folder, unloadedSrc, src, title, oneUp, count, allElementsLoaded, batch } ) => (
			
	<div className = "item citizen">

		<div className = "teaser one-word-per-line">

			<NavLink exact to = { `/showcase/${ folder }` }>

				<ImageLoader 
					className = "teaser-image"
					unloadedSrc = { unloadedSrc }
					src = { src }
					title = { title } 
					alt = { title } 
					oneUp = { oneUp }
					count = { count }
					allElementsLoaded = { allElementsLoaded }
					batch = { batch }
				/>

				<span className = "teaser-title">{ title }</span>

			</NavLink>

		</div>

	</div>

)

export default Teaser
