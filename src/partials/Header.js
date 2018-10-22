import React from 'react'
import { NavLink } from 'react-router-dom'



const CheckActive = ( match, location ) => {

	return match ? true : false
	
}

function HeaderLogo( props ) {
	
	return (
		
		<NavLink 
			to = "/"
		>
			<div 
				className = "header-logo" 
				id = "header-logo" 
				onClick = { () => props.onClick( "/" ) }
			>
				<picture>
					<source srcSet = { props.logo } type = "image/svg+xml" />
					<img src = { props.logo } alt = { props.mainTitle } />
				</picture>

			</div>
		</NavLink>

	)

}

function HeaderNav( props ) {
	
	return (

		<nav className="flexbox row">

			<button 
				className = "uppercase hidden-button" 
				type = "button"
				onClick = { () => props.onClick( "back" ) }
			>
				<span>back</span>
			</button>

			<div className = "services no-select">
				<ul>
					<li>photography</li>
					<li>motion</li>
					<li>art direction</li>
				</ul>
			</div>
			
			<NavLink 
				to = "/contact"
				activeClassName = "vanish no-select current"
				isActive = { CheckActive }
			>
				<button 
					className = "uppercase"
					type = "button" 
					onClick = { () => props.onClick( "/contact" ) }
				>
					<span>contact</span>
				</button>

			</NavLink>

		</nav>

	)
	
}

class Header extends React.Component {

	render() {

		const state = this.props.state
		const targetLocation = state.targetLocation
		const mainTitle = state.mainTitle
		const logo = state.imagePath + "logo/" + state.logo
		const heroIsActive = this.props.heroIsActive

		const classNames = heroIsActive ? 
			  "uppercase appear stick-to-second-section" :
			  "uppercase appear"

		return (

			<header className = { classNames } id = "header" >

				<HeaderLogo
					mainTitle = { mainTitle }
					logo = { logo }
					onClick = { ( i ) => this.props.onClick( i ) }
				/>
				<HeaderNav
					targetLocation = { targetLocation }
					onClick = { ( i ) => this.props.onClick( i ) }
				/>

			</header>

		)

	}
		
}

export default Header;
