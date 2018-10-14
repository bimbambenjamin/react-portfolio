import React from 'react'
import Email from './Email'
import Phone from './Phone'



class ImprintContent extends React.Component {
	
	render() {
		
		return (

			<div className = "active-links freedom-above" id = "imprint">

				<h1>Impressum</h1>

				<ul>
					<li>Sacha Tassilo Hoechstetter</li>
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
				<ul>
					<li>USt-IdNr.: DE813971514</li>
				</ul>

			</div>

		)
		
	}
	
}

function DisclaimerContent() {
	
	return (

		<div 
			className = "active-links freedom-above" 
			id = "disclaimer">
			
			<div>
				<h1>Disclaimer</h1>
			</div>

			<div>
				<p>
					Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß §&thinsp;7 Abs.&thinsp;1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§&thinsp;8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
				</p>
			</div>

		</div>

	)

}

class Imprint extends React.Component {
	
	render() {

		return (

			<section className = "grid">

				<ImprintContent />
				<DisclaimerContent />

			</section>

		)
			
	}
	
}

export default Imprint
