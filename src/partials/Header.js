import React from 'react'



function HeaderLogo( props ) {
		
	return (
		
		<div className = "header-logo" id = "header-logo">

			<a 
				href = "/"
				onClick = { () => props.onClick( "home" ) }
			>

				<object 
					data = { props.logo } 
					type = "image/svg+xml"
				>
					<span>{ props.mainTitle }</span>
				</object>

			</a>

		</div>

	)
}

function HeaderNav( props ) {
	
	const targetLocation = props.targetLocation
	let contactClasses = "uppercase active"
	
	if ( targetLocation === "contact" ) {
		contactClasses = "uppercase inactive" 
	}

	return (

		<nav className="flexbox row">
			<button 
				className = "uppercase hidden-button" 
				type = "button"
				onClick = { () => props.onClick( "back" ) }
			>
				back
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
				onClick = { () => props.onClick( "contact" ) }
			>
				contact
			</button>
		</nav>

	)
	
}

class Header extends React.Component {

	render() {
		
		const targetLocation = this.props.targetLocation
		let classNames = "uppercase appear"
		console.log( "targetLocation: ", targetLocation )
		
		if ( targetLocation === "home" || targetLocation === "heroClick" ) {
			console.log( "header 2nd" )
			classNames = "uppercase stick-to-second-section appear" 
		}

		return (

			<header className = { classNames } id = "header" >

				<HeaderLogo
					mainTitle = { this.props.mainTitle }
					logo = { this.props.logo }
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
