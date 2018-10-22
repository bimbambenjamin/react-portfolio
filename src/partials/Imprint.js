import React from 'react'
import Email from './Email'
import Phone from './Phone'
//import Label from './Label'


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
			className = "active-links freedom-above freedom-below" 
			id = "disclaimer">
			
			<div>
				<h1>Disclaimer</h1>
			</div>

			<div>
				<p>
					Die In&shy;hal&shy;te un&shy;se&shy;rer Sei&shy;ten wur&shy;den mit größ&shy;ter Sorg&shy;falt er&shy;stellt. Für die Rich&shy;tig&shy;keit, Voll&shy;stän&shy;dig&shy;keit und Ak&shy;tuali&shy;tät der In&shy;hal&shy;te kön&shy;nen wir je&shy;doch kei&shy;ne Ge&shy;währ über&shy;neh&shy;men. Als Dienste&shy;anbieter sind wir ge&shy;mäß §&nbsp;7 Abs.&nbsp;1 TMG für ei&shy;ge&shy;ne In&shy;hal&shy;te auf die&shy;sen Sei&shy;ten nach den all&shy;ge&shy;mei&shy;nen Ge&shy;setz&shy;en ver&shy;ant&shy;wort&shy;lich. Nach §§&nbsp;8 bis 10&nbsp;TMG sind wir als Diens&shy;te&shy;an&shy;bie&shy;ter je&shy;doch nicht ver&shy;pflich&shy;tet, über&shy;mit&shy;tel&shy;te oder ge&shy;spei&shy;cher&shy;te frem&shy;de In&shy;for&shy;ma&shy;tio&shy;nen zu über&shy;wa&shy;chen oder nach Um&shy;stän&shy;den zu for&shy;schen, die auf ei&shy;ne rechts&shy;widri&shy;ge Tä&shy;tig&shy;keit hin&shy;wei&shy;sen. Ver&shy;pflich&shy;tungen zur Ent&shy;fer&shy;nung oder Sper&shy;rung der Nut&shy;zung von In&shy;for&shy;ma&shy;tio&shy;nen nach den all&shy;ge&shy;mei&shy;nen Ge&shy;setz&shy;en blei&shy;ben hier&shy;von un&shy;be&shy;rührt. Eine dies&shy;be&shy;züg&shy;liche Haf&shy;tung ist je&shy;doch erst ab dem Zeit&shy;punkt der Kenn&shy;tnis ei&shy;ner kon&shy;kre&shy;ten Rechts&shy;ver&shy;let&shy;zung mög&shy;lich. Bei Be&shy;kannt&shy;wer&shy;den von ent&shy;spre&shy;chen&shy;den Rechts&shy;ver&shy;let&shy;zungen wer&shy;den wir die&shy;se In&shy;hal&shy;te um&shy;gehend ent&shy;fer&shy;nen.
				</p>
			</div>

		</div>

	)

}

class Imprint extends React.Component {
	
	componentDidMount() {		
		window.scroll( { top: 0 } )
		return () => { this.props.ativateHero( true ) }
	}
	
	render() {

		return (

			<div className = "grid header-space">

				<ImprintContent />
				<DisclaimerContent />

			</div>

		)
			
	}
	
}

export default Imprint
