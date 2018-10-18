import React from 'react'
//import ReactDOM from 'react-dom'

import Email from './Email'
import Phone from './Phone'



class PrivacyContent extends React.Component {

//	$( function() {
//		$( ".dropdown-button" ).click( function() {
//			$( this ).parent( ".dropdown" ).toggleClass( "collapsed" );
//			$( this ).parent( ".dropdown" ).toggleClass( "expanded" );
//		} );
//	} );
	constructor( props ) {
		super( props )
		
//		this.toggle = this.toggleDropdown.bind( this )
		this.state = {
			dropdowns: Array(18).fill("collapsed")
		}

	}
	
	handleDropdown( i ) {
		const current = this.state.dropdowns
		const currentClassName = current[ i ]
		const newClassName = currentClassName === "collapsed" ? "expanded" : "collapsed"
		
		const update = current.map( (item, index ) => {
			if ( index === i ) {
				item = newClassName
			}
			return item

		} )
		
		this.toggleDropdown( update )

	}
	
	toggleDropdown( i ) {
		this.setState( {
			dropdowns: i
		} )
	}
	
	render() {
		
		const dropdowns = this.state.dropdowns

		return (

			<div className = "active-links header-space freedom-above freedom-below" id="privacy">

				<div className = "list">
					<h1>Datenschutzerklärung</h1>

					<ol>

						<li className = { dropdowns[ 0 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 0 ) }
							>
								<span>1. </span>Name und Kontaktdaten des für die Verarbeitung Verantwortlichen sowie des betrieblichen Datenschutzbeauftragten
							</h2>
							<div className = "dropdown-arrow"></div>

							<p>
								Diese Datenschutz-Information gilt für die Datenverarbeitung durch:
							</p>

							<ul>
								<li>
									Verantwortlicher: Sacha Tassilo Höchstetter, Jahnstraße 5, 80469 München
								</li>
								<li>
									<Email />
								</li>
								<li>
									<Phone />
								</li>
							</ul>

							<p>
								Der/die betriebliche Datenschutzbeauftragte der Sacha Tassilo Höchstetter Photography ist unter der o. g. Anschrift, zu Hd. Sacha Tassilo Höchstetter, beziehungsweise unter <Email /> erreichbar.
							</p>

						</li>

						<li className = { dropdowns[ 1 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 1 ) }
							>
									<span>2. </span>Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung
							</h2>
							<div className = "dropdown-arrow"></div>

							<ol>

								<li className = { dropdowns[ 2 ] }>
									<h3 className = "dropdown-button" onClick = { () => this.handleDropdown( 2 ) }>
										<span>a) </span>Beim Besuch der Website
									</h3>
									<div className = "dropdown-arrow"></div>

									<p>
										Beim Aufrufen unserer Website <a href = "http://www.sachahoechstetter.com" target = "_blank" rel = "noopener noreferrer">www.sachahoechstetter.com</a> werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:
									</p>

									<ol>
										<li><span>&minus;</span>IP-Adresse des anfragenden Rechners,</li>
										<li><span>&minus;</span>Datum und Uhrzeit des Zugriffs,</li>
										<li><span>&minus;</span>Name und URL der abgerufenen Datei,</li>
										<li><span>&minus;</span>Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>
										<li><span>&minus;</span>verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers.</li>
									</ol>

									<p>Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:</p>

									<ol>
										<li><span>&minus;</span>Gewährleistung eines reibungslosen Verbindungsaufbaus der Website,</li>
										<li><span>&minus;</span>Auswertung der Systemsicherheit und -stabilität sowie</li>
										<li><span>&minus;</span>zu weiteren administrativen Zwecken.</li>
									</ol>

									<p>
										Die Rechtsgrundlage für die Datenverarbeitung ist Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;f DSGVO. Unser berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung. In keinem Fall verwenden wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre Person zu ziehen.
									</p>
									<p>
										Darüber hinaus setzen wir beim Besuch unserer Website Cookies sowie Analysedienste ein. Nähere Erläuterungen dazu erhalten Sie unter den Ziff. 4 und 5 dieser Datenschutzerklärung.
									</p>

								</li>

								<li className = { dropdowns[ 3 ] }>
									<h3 className = "dropdown-button" onClick = { () => this.handleDropdown( 3 ) }>
										<span>b) </span>Bei Anmeldung für unseren Newsletter
									</h3>
									<div className = "dropdown-arrow"></div>

									<p>
										Sofern Sie nach Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;a DSGVO ausdrücklich eingewilligt haben, verwenden wir Ihre E-Mail-Adresse dafür, Ihnen regelmäßig unseren Newsletter zu übersenden. Für den Empfang des Newsletters ist die Angabe einer E-Mail-Adresse ausreichend.
									</p>
									<p>
										Die Abmeldung ist jederzeit möglich, zum Beispiel über einen Link am Ende eines jeden Newsletters. Alternativ können Sie Ihren Abmeldewunsch gerne auch jederzeit an <Email /> per E-Mail senden.
									</p>

								</li>

								<li className = { dropdowns[ 4 ] }>
									<h3 className = "dropdown-button" onClick = { () => this.handleDropdown( 4 ) }>
										<span>c) </span>Bei Nutzung unseres Kontaktformulars
									</h3>
									<div className = "dropdown-arrow"></div>

									<p>
										Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website bereitgestelltes Formular Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können. Weitere Angaben können freiwillig getätigt werden.
									</p>
									<p>
										Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;a DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung.
									</p>
									<p>
										Die für die Benutzung des Kontaktformulars von uns erhobenen personenbezogenen Daten werden nach Erledigung der von Ihnen gestellten Anfrage automatisch gelöscht.
									</p>

								</li>

							</ol>

						</li>

						<li className = { dropdowns[ 5 ] }>
							
							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 5 ) }
							>
									<span>3. </span>Weitergabe von Daten
							</h2>
							<div className = "dropdown-arrow"></div>

							<p>Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt.</p>
							<p>Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:</p>

							<ol>
								<li><span>&minus;</span>
									Sie Ihre nach Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;a DSGVO ausdrückliche Einwilligung dazu erteilt haben,
								</li>
								<li><span>&minus;</span>
									die Weitergabe nach Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,
								</li>
								<li><span>&minus;</span>
									für den Fall, dass für die Weitergabe nach Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;c DSGVO eine gesetzliche Verpflichtung besteht, sowie
								</li>
								<li><span>&minus;</span>
									dies gesetzlich zulässig und nach Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;b DSGVO für die Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.
								</li>
							</ol>

						</li>

						<li className = { dropdowns[ 6 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 6 ) }
							>
									<span>4. </span>Cookies
							</h2>
							<div className = "dropdown-arrow"></div>

							<p>
								Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie unsere Seite besuchen. Cookies richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder sonstige Schadsoftware.
							</p>
							<p>
								In dem Cookie werden Informationen abgelegt, die sich jeweils im Zusammenhang mit dem spezifisch eingesetzten Endgerät ergeben. Dies bedeutet jedoch nicht, dass wir dadurch unmittelbar Kenntnis von Ihrer Identität erhalten.
							</p>
							<p>
								Der Einsatz von Cookies dient einerseits dazu, die Nutzung unseres Angebots für Sie angenehmer zu gestalten. So setzen wir sogenannte Session-Cookies ein, um zu erkennen, dass Sie einzelne Seiten unserer Website bereits besucht haben. Diese werden nach Verlassen unserer Seite automatisch gelöscht.
							</p>
							<p>
								Darüber hinaus setzen wir ebenfalls zur Optimierung der Benutzerfreundlichkeit temporäre Cookies ein, die für einen bestimmten festgelegten Zeitraum auf Ihrem Endgerät gespeichert werden. Besuchen Sie unsere Seite erneut, um unsere Dienste in Anspruch zu nehmen, wird automatisch erkannt, dass Sie bereits bei uns waren und welche Eingaben und Einstellungen sie getätigt haben, um diese nicht noch einmal eingeben zu müssen.
							</p>
							<p>
								Zum anderen setzten wir Cookies ein, um die Nutzung unserer Website statistisch zu erfassen und zum Zwecke der Optimierung unseres Angebotes für Sie auszuwerten (siehe Ziff. 5). Diese Cookies ermöglichen es uns, bei einem erneuten Besuch unserer Seite automatisch zu erkennen, dass Sie bereits bei uns waren. Diese Cookies werden nach einer jeweils definierten Zeit automatisch gelöscht.
							</p>
							<p>
								Die durch Cookies verarbeiteten Daten sind für die genannten Zwecke zur Wahrung unserer berechtigten Interessen sowie der Dritter nach Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;f DSGVO erforderlich.
							</p>
							<p>
								Die meisten Browser akzeptieren Cookies automatisch. Sie können Ihren Browser jedoch so konfigurieren, dass keine Cookies auf Ihrem Computer gespeichert werden oder stets ein Hinweis erscheint, bevor ein neuer Cookie angelegt wird. Die vollständige Deaktivierung von Cookies kann jedoch dazu führen, dass Sie nicht alle Funktionen unserer Website nutzen können.
							</p>

						</li>

						<li className = { dropdowns[ 7 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 7 ) }
							>
									<span>5. </span>Analyse-Tools
							</h2>
							<div className = "dropdown-arrow"></div>

							<ol>

								<li className = { dropdowns[ 8 ] }>
									<h3 className = "dropdown-button" onClick = { () => this.handleDropdown( 8 ) }>
										<span>a) </span>Tracking-Tools
									</h3>
									<div className = "dropdown-arrow"></div>

									<p>
										Die im Folgenden aufgeführten und von uns eingesetzten Tracking-Maßnahmen werden auf Grundlage des Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;f DSGVO durchgeführt. Mit den zum Einsatz kommenden Tracking-Maßnahmen wollen wir eine bedarfsgerechte Gestaltung und die fortlaufende Optimierung unserer Webseite sicherstellen. Zum anderen setzen wir die Tracking-Maßnahmen ein, um die Nutzung unserer Webseite statistisch zu erfassen und zum Zwecke der Optimierung unseres Angebotes für Sie auszuwerten. Diese Interessen sind als berechtigt im Sinne der vorgenannten Vorschrift anzusehen.
									</p>
									<p>
										Die jeweiligen Datenverarbeitungszwecke und Datenkategorien sind aus den entsprechenden Tracking-Tools zu entnehmen.
									</p>
								</li>

								<li className = { dropdowns[ 9 ] }>
									<h3 className = "dropdown-button" onClick = { () => this.handleDropdown( 9 ) }>
										<span>b) </span>Google Analytics<span className = "footnote">&#42;</span>
									</h3>
									<div className = "dropdown-arrow"></div>

									<p>
										Zum Zwecke der bedarfsgerechten Gestaltung und fortlaufenden Optimierung unserer Seiten nutzen wir Google Analytics, ein Webanalysedienst der Google Inc. (<a href="https://www.google.de/intl/de/about/" target="_blank" rel="noopener noreferrer">https://www.google.de/intl/de/about/</a>) (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; im Folgenden „Google“). In diesem Zusammenhang werden pseudonymisierte Nutzungsprofile erstellt und Cookies (siehe unter Ziff. 4) verwendet. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website wie
									</p>
									<ol>
										<li><span>&minus;</span>Browser-Typ/-Version,</li>
										<li><span>&minus;</span>verwendetes Betriebssystem,</li>
										<li><span>&minus;</span>Referrer-URL (die zuvor besuchte Seite),</li>
										<li><span>&minus;</span>Hostname des zugreifenden Rechners (IP-Adresse),</li>
										<li><span>&minus;</span>Uhrzeit der Serveranfrage,</li>
									</ol>
									<p>
										werden an einen Server von Google in den USA übertragen und dort gespeichert. Die Informationen werden verwendet, um die Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu Zwecken der Marktforschung und bedarfsgerechten Gestaltung dieser Internetseiten zu erbringen. Auch werden diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben ist oder soweit Dritte diese Daten im Auftrag verarbeiten. Es wird in keinem Fall Ihre IP-Adresse mit anderen Daten von Google zusammengeführt. Die IP-Adressen werden anonymisiert, so dass eine Zuordnung nicht möglich ist (IP-Masking).
									</p>
									<p>
										Sie können die Installation der Cookies durch eine entsprechende Einstellung der Browser-Software verhindern; wir weisen jedoch darauf hin, dass in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich genutzt werden können.
									</p>
									<p>
										Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie ein Browser-Add-on herunterladen und installieren (<a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout?hl=de</a>).
									</p>
									<p>
										Alternativ zum Browser-Add-on, insbesondere bei Browsern auf mobilen Endgeräten, können Sie die Erfassung durch Google Analytics zudem verhindern, indem Sie auf diesen Link klicken. Es wird ein Opt-out-Cookie gesetzt, das die zukünftige Erfassung Ihrer Daten beim Besuch dieser Website verhindert. Der Opt-out-Cookie gilt nur in diesem Browser und nur für unsere Website und wird auf Ihrem Gerät abgelegt. Löschen Sie die Cookies in diesem Browser, müssen Sie das Opt-out-Cookie erneut setzen.
									</p>
									<p>
										Weitere Informationen zum Datenschutz im Zusammenhang mit Google Analytics finden Sie etwa in der Google Analytics-Hilfe (<a href="https://support.google.com/analytics/answer/6004245?hl=de" target="_blank" rel="noopener noreferrer">https://support.google.com/analytics/answer/6004245?hl=de</a>).
									</p>
								</li>

								<li className = { dropdowns[ 10 ] }>
									<h3 className = "dropdown-button" onClick = { () => this.handleDropdown( 10 ) }>
										<span>c) </span>Google Adwords Conversion Tracking
									</h3>
									<div className = "dropdown-arrow"></div>

									<p>
										Um die Nutzung unserer Webseite statistisch zu erfassen und zum Zwecke der Optimierung unserer Website für Sie auszuwerten, nutzen wir ferner das Google Conversion Tracking. Dabei wird von Google Adwords ein Cookie (siehe Ziffer 4) auf Ihrem Rechner gesetzt, sofern Sie über eine Google-Anzeige auf unsere Webseite gelangt sind.
									</p>
									<p>
										Diese Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen nicht der persönlichen Identifizierung. Besucht der Nutzer bestimmte Seiten der Webseite des Adwords-Kunden und das Cookie ist noch nicht abgelaufen, können Google und der Kunde erkennen, dass der Nutzer auf die Anzeige geklickt hat und zu dieser Seite weitergeleitet wurde.
									</p>
									<p>
										Jeder Adwords-Kunde erhält ein anderes Cookie. Cookies können somit nicht über die Webseiten von Adwords-Kunden nachverfolgt werden. Die mithilfe des Conversion-Cookies eingeholten Informationen dienen dazu, Conversion-Statistiken für Adwords-Kunden zu erstellen, die sich für Conversion-Tracking entschieden haben. Die Adwords-Kunden erfahren die Gesamtanzahl der Nutzer, die auf ihre Anzeige geklickt haben und zu einer mit einem Conversion-Tracking-Tag versehenen Seite weitergeleitet wurden. Sie erhalten jedoch keine Informationen, mit denen sich Nutzer persönlich identifizieren lassen.
									</p>
									<p>
										Wenn Sie nicht an dem Tracking-Verfahren teilnehmen möchten, können Sie auch das hierfür erforderliche Setzen eines Cookies ablehnen – etwa per Browser-Einstellung, die das automatische Setzen von Cookies generell deaktiviert. Sie können Cookies für Conversion-Tracking auch deaktivieren, indem Sie Ihren Browser so einstellen, dass Cookies von der Domain „www.googleadservices.com“ blockiert werden. Googles Datenschutzbelehrung zum Conversion-Tracking finden Sie hier (<a href="https://services.google.com/sitestats/de.html" target="_blank" rel="noopener noreferrer">https://services.google.com/sitestats/de.html</a>).
									</p>
								</li>
							</ol>
						</li>

						<li className = { dropdowns[ 11 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 11 ) }
							>
									<span>6. </span>Social Media Plug-ins
							</h2>
							<div className = "dropdown-arrow"></div>

							<p>
								Wir setzen auf unserer Website auf Grundlage des Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;f DSGVO Social Plug-ins der sozialen Netzwerke Facebook und Instagram ein, um unsere Firma hierüber bekannter zu machen. Der dahinterstehende werbliche Zweck ist als berechtigtes Interesse im Sinne der DSGVO anzusehen. Die Verantwortung für den datenschutzkonformen Betrieb ist durch deren jeweiligen Anbieter zu gewährleisten. Die Einbindung dieser Plug-ins durch uns erfolgt im Wege der sogenannten Zwei-Klick-Methode um Besucher unserer Webseite bestmöglich zu schützen. 
							</p>
							<ol>
								<li className = { dropdowns[ 12 ] }>
									<h3 className = "dropdown-button" onClick = { () => this.handleDropdown( 12 ) }>
										<span>a) </span>Facebook
									</h3>
									<div className = "dropdown-arrow"></div>

									<p>
										Auf unserer Website kommen Social-Media Plugins von Facebook zum Einsatz, um deren Nutzung persönlicher zu gestalten. Hierfür nutzen wir den „LIKE“ oder „TEILEN“-Button. Es handelt sich dabei um ein Angebot von Facebook.
									</p>
									<p>
										Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches Plugin enthält, baut Ihr Browser eine direkte Verbindung mit den Servern von Facebook auf. Der Inhalt des Plugins wird von Facebook direkt an Ihren Browser übermittelt und von diesem in die Webseite eingebunden.
									</p>
									<p>
										Durch die Einbindung der Plugins erhält Facebook die Information, dass Ihr Browser die entsprechende Seite unseres Webauftritts aufgerufen hat, auch wenn Sie kein Facebook-Konto besitzen oder gerade nicht bei Facebook eingeloggt sind. Diese Information (einschließlich Ihrer IP-Adresse) wird von Ihrem Browser direkt an einen Server von Facebook in den USA übermittelt und dort gespeichert.
									</p>
									<p>
										Sind Sie bei Facebook eingeloggt, kann Facebook den Besuch unserer Website Ihrem Facebook-Konto direkt zuordnen. Wenn Sie mit den Plugins interagieren, zum Beispiel den „LIKE“ oder „TEILEN“-Button betätigen, wird die entsprechende Information ebenfalls direkt an einen Server von Facebook übermittelt und dort gespeichert. Die Informationen werden zudem auf Facebook veröffentlicht und Ihren Facebook-Freunden angezeigt.
									</p>
									<p>
										Facebook kann diese Informationen zum Zwecke der Werbung, Marktforschung und bedarfsgerechten Gestaltung der Facebook-Seiten benutzen. Hierzu werden von Facebook Nutzungs-, Interessen- und Beziehungsprofile erstellt, z.&thinsp;B. um Ihre Nutzung unserer Website im Hinblick auf die Ihnen bei Facebook eingeblendeten Werbeanzeigen auszuwerten, andere Facebook-Nutzer über Ihre Aktivitäten auf unserer Website zu informieren und um weitere mit der Nutzung von Facebook verbundene Dienstleistungen zu erbringen.
									</p>
									<p>
										Wenn Sie nicht möchten, dass Facebook die über unseren Webauftritt gesammelten Daten Ihrem Facebook-Konto zuordnet, müssen Sie sich vor Ihrem Besuch unserer Website bei Facebook ausloggen.
									</p>
									<p>
										Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Facebook sowie Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre entnehmen Sie bitte den Datenschutzhinweisen (<a href="https://www.facebook.com/about/privacy/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/about/privacy/</a>) von Facebook.
									</p>
								</li>
								<li className = { dropdowns[ 13 ] }>
									<h3 className = "dropdown-button" onClick = { () => this.handleDropdown( 13 ) }>
										<span>b) </span>Instagram
									</h3>
									<div className = "dropdown-arrow"></div>

									<p>
										Auf unserer Website werden auch sogenannte Social Plugins („Plugins“) von Instagram verwendet, das von der Instagram LLC., 1601 Willow Road, Menlo Park, CA 94025, USA („Instagram“) betrieben wird.
									</p>
									<p>
										Die Plugins sind mit einem Instagram-Logo beispielsweise in Form einer „Instagram-Kamera“ gekennzeichnet.
									</p>
									<p>
										Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches Plugin enthält, stellt Ihr Browser eine direkte Verbindung zu den Servern von Instagram her. Der Inhalt des Plugins wird von Instagram direkt an Ihren Browser übermittelt und in die Seite eingebunden. Durch diese Einbindung erhält Instagram die Information, dass Ihr Browser die entsprechende Seite unseres Webauftritts aufgerufen hat, auch wenn Sie kein Instagram-Profil besitzen oder gerade nicht bei Instagram eingeloggt sind.
									</p>
									<p>
										Diese Information (einschließlich Ihrer IP-Adresse) wird von Ihrem Browser direkt an einen Server von Instagram in die USA übermittelt und dort gespeichert. Sind Sie bei Instagram eingeloggt, kann Instagram den Besuch unserer Website Ihrem Instagram-Account unmittelbar zuordnen. Wenn Sie mit den Plugins interagieren, zum Beispiel das „Instagram“-Button betätigen, wird diese Information ebenfalls direkt an einen Server von Instagram übermittelt und dort gespeichert.
									</p>
									<p>
										Die Informationen werden außerdem auf Ihrem Instagram-Account veröffentlicht und dort Ihren Kontakten angezeigt.
									</p>
									<p>
										Wenn Sie nicht möchten, dass Instagram die über unseren Webauftritt gesammelten Daten unmittelbar Ihrem Instagram-Account zuordnet, müssen Sie sich vor Ihrem Besuch unserer Website bei Instagram ausloggen.
									</p>
									<p>
										Weitere Informationen hierzu Sie in der Datenschutzerklärung (<a href = "https://help.instagram.com/155833707900388" target = "_blank" rel = "noopener noreferrer">https://help.instagram.com/155833707900388</a>) von Instagram.
									</p>
								</li>
							</ol>
						</li>

						<li className = { dropdowns[ 14 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 14 ) }
							>
									<span>7. </span>Betroffenenrechte
							</h2>
							<div className = "dropdown-arrow"></div>

							<p>Sie haben das Recht:</p>
							<p>
								gemäß Art.&thinsp;15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen. Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, das Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer Daten, sofern diese nicht bei uns erhoben wurden, sowie über das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling und ggf. aussagekräftigen Informationen zu deren Einzelheiten verlangen;
							</p>
							<p>
								gemäß Art.&thinsp;16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;
							</p>
							<p>
								gemäß Art.&thinsp;17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist;
							</p>
							<p>
								gemäß Art.&thinsp;18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie aber deren Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie jedoch diese zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder Sie gemäß Art.&thinsp;21 DSGVO Widerspruch gegen die Verarbeitung eingelegt haben;
							</p>
							<p>
								gemäß Art.&thinsp;20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;
							</p>
							<p>
								gemäß Art.&thinsp;7 Abs.&thinsp;3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen. Dies hat zur Folge, dass wir die Datenverarbeitung, die auf dieser Einwilligung beruhte, für die Zukunft nicht mehr fortführen dürfen und
							</p>
							<p>
								gemäß Art.&thinsp;77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren. In der Regel können Sie sich hierfür an die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres Unternehmenssitzes wenden.

							</p>
						</li>

						<li className = { dropdowns[ 15 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 15 ) }
							>
									<span>8. </span>Widerspruchsrecht
							</h2>
							<div className = "dropdown-arrow"></div>

							<p>
								Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Art.&thinsp;6 Abs.&thinsp;1 S.&thinsp;1 lit.&thinsp;f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art.&thinsp;21 DSGVO Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder sich der Widerspruch gegen Direktwerbung richtet. Im letzteren Fall haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer besonderen Situation von uns umgesetzt wird.
							</p>
							<p>
								Möchten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen, genügt eine E-Mail an <Email />.
							</p>
						</li>

						<li className = { dropdowns[ 16 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 16 ) }
							>
									<span>9. </span>Datensicherheit
							</h2>
							<div className = "dropdown-arrow"></div>

							<p>
								Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. In der Regel handelt es sich dabei um eine 256 Bit Verschlüsselung. Falls Ihr Browser keine 256-Bit Verschlüsselung unterstützt, greifen wir stattdessen auf 128-Bit v3 Technologie zurück. Ob eine einzelne Seite unseres Internetauftrittes verschlüsselt übertragen wird, erkennen Sie an der geschlossenen Darstellung des Schüssel- beziehungsweise Schloss-Symbols in der unteren Statusleiste Ihres Browsers.
							</p>
							<p>
								Wir bedienen uns im Übrigen geeigneter technischer und organisatorischer Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
							</p>
						</li>

						<li className = { dropdowns[ 17 ] }>

							<h2 
								className = "dropdown-button"
								onClick = { () => this.handleDropdown( 17 ) }
							>
									<span>10. </span>Aktualität und Änderung dieser Datenschutzerklärung
							</h2>
							<div className = "dropdown-arrow"></div>

							<p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2018.</p>
						</li>

					</ol>

				</div>

				<p>Sie können der Erhebung und Speicherung Ihrer Daten jederzeit widersprechen.</p>

				<p className = "footnotes">
					&#42; Datenschutzbehörden verlangen für den zulässigen Einsatz von Google Analytics den <br className = "break-wide" />Abschluss einer Auftragsdatenverarbeitungs-Vereinbarung. Eine entsprechende Vorlage <br className = "break-wide" />wird unter <a href = "http://www.google.com/analytics/terms/de.pdf" target = "_blank" rel = "noopener noreferrer">http://www.google.com/analytics/terms/de.pdf</a> von Google angeboten.
				</p>

			</div>
	
		)

	}

}

class Privacy extends React.Component {
	
	render() {
			
		return (

            <section className = "grid">

				<PrivacyContent />

            </section>

		)

	}

}

export default Privacy
