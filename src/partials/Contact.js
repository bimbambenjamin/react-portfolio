import React from 'react'
import Social from './Social'
import Email from './Email'
import Phone from './Phone'



function Copyright() {

	return (
		<div className = "uppercase" id = "copyright">
			<p>
				All images and texts are <br className = "break-narrow"/>copyrighted and owned by <br className = "break-narrow"/>Sacha Tassilo Hoechstetter. <br className = "break-wide"/>Under no circumstances <br className = "break-narrow"/>shall these digital files, <br className = "break-narrow"/>images and videos <br className = "break-wide"/>be used, <br className = "break-narrow"/>copied, displayed or pulled <br className = "break-narrow"/>from this site without the expressed <br className = "break-wide"/>written agreement <br className = "break-narrow"/>of Sacha Tassilo Hoechstetter.
			</p>
		</div>
	)
}
class Contact extends React.Component {

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
