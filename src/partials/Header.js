import React from 'react'
import { Link } from 'react-router-dom'



function HeaderLogo( props ) {
	
	return (
		
			<div 
				className = "header-logo" 
				id = "header-logo" 
				onClick = { () => props.onClick( "/" ) }
			>
				<Link to = "/">
					<picture>
						<source srcSet = { props.logo } type = "image/svg+xml" />
						<img src = { props.logo } alt = { props.mainTitle } />
					</picture>
				</Link>

			</div>

	)

}

function HeaderNav( props ) {
	
	const targetLocation = props.targetLocation
	let contactClasses = "uppercase active"
	
	if ( targetLocation === "/contact" ) {
		contactClasses = "uppercase inactive" 
	}

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

			<button 
				className = { contactClasses }
				type = "button" 
				onClick = { () => props.onClick( "/contact" ) }
			>
				<Link to = "/contact">
					<span>contact</span>
				</Link>

			</button>
			
		</nav>

	)
	
}

class Header extends React.Component {

	render() {
		
		const targetLocation = this.props.targetLocation
		const logo = this.props.imagePath + "logo/" + this.props.logo
		let classNames = "uppercase appear"
		
		console.log("logo: ", logo)

		if ( targetLocation === "/" || targetLocation === "heroClick" ) {
			classNames = "uppercase stick-to-second-section appear" 
		}

		return (

			<header className = { classNames } id = "header" >

				<HeaderLogo
					mainTitle = { this.props.mainTitle }
					logo = { logo }
					onClick = { ( i ) => this.props.onClick( i ) }
				/>
				<HeaderNav
					targetLocation = { this.props.targetLocation }
					onClick = { ( i ) => this.props.onClick( i ) }
				/>

			</header>

		)

	}
		
}

export default Header;
