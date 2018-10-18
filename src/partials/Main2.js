import React from 'react'
import { NavLink } from 'react-router-dom'

//import Hero from './Hero'
//import Header from './Header'
//import Gallery from './Gallery'
//import Showcase from './Showcase'
//import Social from './Social'
//import Contact from './Contact'
//import Imprint from './Imprint'
//import Privacy from './Privacy'


function HeaderLogo( props ) {
	
	const logo = "https://www.benjamin-jager.com/projects/sacha-assets/img/logo/hoechstetter.svg"
	return (
		
			<div 
				className = "header-logo invisible" 
				id = "header-logo" 
			>
				<NavLink to = "/">
					<picture>
						<source srcSet = { logo } type = "image/svg+xml" />
						<img src = { logo } alt = "geil" />
					</picture>
				</NavLink>

			</div>

	)

}
function HeaderNav( props ) {
	
	return (

		<nav className="flexbox row">

			<button 
				className = "uppercase active" 
				type = "button"
			>
				<NavLink 
					to = { {
						pathname: "/imprint",
						state: {
							fromContact: false		
						}
					} }
					activeClassName = "big-text"
				>
					<span>imprint</span>
				</NavLink>
			</button>

			<div className = "services no-select">
				<ul>
					<li>photography</li>
					<li>motion</li>
					<li>art direction</li>
				</ul>
			</div>

			<button 
				className = "uppercase active"
				type = "button" 
			>
				<NavLink 
					to = { {
						pathname: "/contact",
						state: {
							fromContact: true		
						}
					} }
					activeClassName = "big-text"
					isActive = { CheckActive }
				>
					<span>contact</span>
				</NavLink>

			</button>
			
		</nav>

	)
	
}
const CheckActive = ( match, location ) => {
	console.log( "CheckActive: ", match, location )
	return true
}

class Main2 extends React.Component {

	render() {
		
		return(

			<header id = "header" >

				<HeaderLogo />
				<HeaderNav />

			</header>
			
		)

	}
}

export default Main2
