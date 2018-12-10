import React from 'react'
import { NavLink } from 'react-router-dom'



const CheckActive = ( match, location ) => {
	
	return match ? true : false

}

function FooterNav( props ) {
	
	let imprintClasses = "uppercase"
	let privacyClasses = "uppercase"
	
	return (

		<footer className = "uppercase appear">

			<ul className = "flexbox">

				<li>
		
					<NavLink 
						to = "/imprint"
						activeClassName = "vanish no-select current"
						isActive = { CheckActive }
					>
						<button 
							className = { imprintClasses }  
                            id = "imprint-button"
							type = "button"
							onClick = { () => props.onClick( "/imprint" ) }
						>
							<span>imprint</span>
						</button>
					</NavLink>

		 		</li>

				<li>
					<NavLink 
						to = "/privacy"
						activeClassName = "vanish no-select current"
						isActive = { CheckActive }
					>
						<button 
							className = { privacyClasses } 
                            id = "privacy-button"
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
				onClick = { ( i ) => this.props.onClick( i ) }
			/>
		)

	}

}

export default Footer
