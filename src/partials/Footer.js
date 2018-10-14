import React from 'react'
//import { NavLink } from 'react-router-dom'


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

		<footer className = "uppercase freedom-above">

			<ul className = "flexbox">
				<li>
					<button 
		 				className = { imprintClasses }  
		 				type = "button"
		 				onClick = { () => props.onClick( "imprint" ) }
					>
						imprint
					</button>
		 		</li>
				<li>&emsp;</li>
		 		<li>
					<button 
		 				className = { privacyClasses } 
		 				type = "button"
		 				onClick = { () => props.onClick( "privacy" ) }
					>
						privacy&nbsp;policy
					</button>

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
