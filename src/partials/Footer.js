import React from 'react'
import { Link } from 'react-router-dom'


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

		<footer className = "uppercase freedom-above appear-delayed">

			<ul className = "flexbox">
				<li>
					<button 
		 				className = { imprintClasses }  
		 				type = "button"
		 				onClick = { () => props.onClick( "/imprint" ) }
					>
					<Link to = "/imprint">
						<span>imprint</span>
					</Link>
					</button>
		 		</li>
				<li>&emsp;</li>
		 		<li>
					<button 
		 				className = { privacyClasses } 
		 				type = "button"
		 				onClick = { () => props.onClick( "/privacy" ) }
					>
					<Link to = "/privacy">
						<span>privacy&nbsp;policy</span>
					</Link>
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
