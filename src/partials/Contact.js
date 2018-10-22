import React from 'react'
import Social from './Social'
import Email from './Email'
import Phone from './Phone'



function Copyright() {

	return (
		<div className = "uppercase" id = "copyright">
			<p>
				All im&shy;ages and texts are cop&shy;y&shy;right&shy;ed and own&shy;ed by Sacha&nbsp;Tassilo Hoechstetter. Un&shy;der no cir&shy;cum&shy;stances shall these dig&shy;i&shy;tal files, im&shy;ages and vid&shy;eos be used, cop&shy;ied, dis&shy;play&shy;ed or pull&shy;ed from this site with&shy;out the ex&shy;press&shy;ed writ&shy;ten agree&shy;ment of Sacha&nbsp;Tassilo Hoechstetter.
			</p>
		</div>
	)
}
class Contact extends React.Component {

	componentDidMount() {
		window.scroll( { top: 0 } )
	}
		
	render() {
		
		return (

			<div className = "active-links freedom-below">

				<div className = "header-space freedom-below uppercase big-text" id = "contact">

					<h1>contact</h1>

					<ul>
						<li>Sacha Tassilo Hoechstetter</li>
						<li>Photography Motion Art Direction</li>
						<li>Jahnstraße 5, 80469 München</li>
					</ul>

					<ul>
						<li>
							<Email />
						</li>
						<li>
							<Phone />
						</li>
					</ul>

				</div>

				<Social />
				<Copyright />
			
			</div>

		)
		
	}
	
}

export default Contact
