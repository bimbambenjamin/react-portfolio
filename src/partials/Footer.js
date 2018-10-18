import React from 'react'
import { NavLink } from 'react-router-dom'



const CheckActive = ( match, location ) => {
	
	console.log( "CheckActive Footer", match, location )
	console.log( "CheckActive Footer", this )

	return match ? true : false

}

function FooterNav( props ) {
	
	const targetLocation = props.targetLocation
	let imprintClasses = "uppercase active"
	let privacyClasses = "uppercase active"
	
	if ( targetLocation === "imprint" ) {
		imprintClasses = "uppercase inactive" 
	}
	if ( targetLocation === "privacy" ) {
		privacyClasses = "uppercase inactive" 
	}

	return (

		<footer className = "uppercase appear">

			<ul className = "flexbox">

				<li>
		
					<NavLink 
						to = "/imprint"
						activeClassName = "vanish no-select"
						isActive = { CheckActive }
					>
						<button 
							className = { imprintClasses }  
							type = "button"
							onClick = { () => props.onClick( "/imprint" ) }
						>
							<span>imprint</span>
						</button>
					</NavLink>

		 		</li>

				<li>&emsp;</li>

				<li>
					<NavLink 
						to = "/privacy"
						activeClassName = "vanish no-select"
						isActive = { CheckActive }
					>
						<button 
							className = { privacyClasses } 
							type = "button"
							onClick = { () => props.onClick( "/privacy" ) }
						>
							<span>privacy&nbsp;policy</span>
						</button>
					</NavLink>

				</li>

			</ul>

		</footer>

	)

}

class Footer extends React.Component {

	render() {

		return (
		
			<FooterNav
				targetLocation = { this.props.targetLocation }
				onClick = { ( i ) => this.props.onClick( i ) }
			/>
		)

	}

}

export default Footer
