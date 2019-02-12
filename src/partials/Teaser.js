import React from 'react'
import { NavLink } from 'react-router-dom'

import ElementLoader from '../handler/ElementLoader'



const Teaser = ( { props } ) => { 

	console.log( "TEASER PROPS", props )
	const width = props.showcase.teaser.width
	const className={ width === 600 ? "item rebel" : "item citizen"}


	// oneUp={oneUp}
	// allElementsLoaded={allElementsLoaded}
	// batch={batch}


	return (
		
		<div className = { className }>
			<div className = "teaser one-word-per-line">
				<NavLink 
					exact
					to = { `/showcase/${ folder }` } 
				>

					<ElementLoader 
						className = "teaser-image"
						title = { title } 
						alt = { title } 
						unloadedSrc = { props.state.preloader }
						src = { helpers.getFullPath( showcasesPath, showcase.folder, showcase.teaser ) }
						count = { this.state.count }
						oneUp = { oneUp }
						allElementsLoaded = { allElementsLoaded }
						batch = { batch }
						showControls = { false }
					/>

					<span className = "teaser-title">{ title }</span>

				</NavLink>
			</div>
		</div>

	)

}

export default Teaser
