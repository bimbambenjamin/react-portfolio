import React from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from './partials/Header'
import Footer from './partials/Footer'
import HomeRoute from './routes/HomeRoute'
import ShowcaseRoute from './routes/ShowcaseRoute'
import ContactRoute from './routes/ContactRoute'
import ImprintRoute from './routes/ImprintRoute'
import PrivacyRoute from './routes/PrivacyRoute'

import * as helpers from './handler/helpers'



const backendPath = process.env.REACT_APP_BACKEND_URL
const PUBLIC_JSON = backendPath + "/public.json"
const backend = PUBLIC_JSON || 8080

// TODO: get rid of these -> from json
const showcasesPath = backendPath + "/showcases"
const assetsPath = "/assets" // --> backendPath
const imagesPath = "/assets/img" // --> backendPath + ?




// all website content should be in here!
// all children-components need to be dynamic
//




// TODO: refactor scroll functions
// for scroll fn

class App extends React.Component {

	constructor(props) {

		super(props)

		this.state = {

			// backend files
			// TODO: refactor hero
			heroElements: [],
			showcases: [],
			backendConnected: false,

			// paths -> bullshit?
			backendPath: backendPath,
			showcasesPath: showcasesPath,
			imagesPath: imagesPath,

			// bullshit?
			imageLoaded: false,
			imageErrored: false,

			// server files -> bullshit! file-paths from json
			preloader: helpers.getFullPath(assetsPath, "tools", "tail-spin.svg"),

			logo: {
				small: {
					svg: helpers.getFullPath(assetsPath, "logo", "logo-small.svg"),
					png: helpers.getFullPath(assetsPath, "logo", "logo-small.png"),
				},
				long: {
					svg: helpers.getFullPath(assetsPath, "logo", "logo-long.svg"),
					png: helpers.getFullPath(assetsPath, "logo", "logo-long.png"),
				},
				hero: {
					svg: helpers.getFullPath(assetsPath, "logo", "logo-hero.svg"),
					png: helpers.getFullPath(assetsPath, "logo", "logo-hero.png"),
				}
			},

			// hero
			// bullshit?
			heroIsActive: false,
			heroIsVisible: true,
			heroDidLoad: false,

			// domain settings
			mainTitle: "SASCHA TASSILO HOECHSTETTER", // -> from json
			targetLocation: this.handleLocation( window.location.pathname ),
			validRoutes: {
				home: "/",
				showcase: "/showcase/:folderId",
				contact: "/contact",
				imprint: "/imprint",
				privacy: "/privacy"
			},

			// tech
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			scrollPosition: window.scrollY,
			scrollingDown: false

		}

		this.onResize = this.handleResize.bind( this )
		this.onScroll = this.handleScroll.bind( this )
		this.oneUp = this.heroStatus.bind( this )
		this.onClick = this.handleClick.bind( this )
	}

	componentDidMount() {

		this.onResize()

		// TODO: refactor scroll
		window.addEventListener( "scroll", this.onScroll )
		window.addEventListener( "resize", this.onResize )

		if ( this.state.backendConnected === false ) {

			axios
				.get( backend )
				.then( res => {
					const assets = res.data
					this.setState( {
						showcases: assets.showcases,
						heroElements: assets.heroElements,
						backendConnected: true
					} )
					this.validateTarget( this.state.targetLocation )
				} )

		}

	}
	componentWillUnmount() {
		window.removeEventListener( "scroll", this.onScroll )
		window.removeEventListener( "resize", this.onResize )
	}




	getAlpha() {

		const a = window.innerHeight
		const b = window.innerWidth
		const c = Math.sqrt((a * a) + (b * b))
		const sinAlpha = a / c
		const alpha = Math.asin(sinAlpha)
		return Math.floor(alpha * -180 / Math.PI)
	}
	setAngleCss(angle) {
		document.documentElement.style.setProperty("--logo-angle", `${angle}deg`);
	}
	validateTarget( target ) {

		const validRoutes = this.state.validRoutes
		const home = validRoutes.home
		const validFolders = this.state.showcases.map( ( showcase ) => (
			showcase.folder
		) )
		const filter = ( o ) => {
			let b = false
			for ( let k in o ) {
				if ( o[ k ] === "/" + target ) b = true
			}
			if ( !b ) this.goTo( home )
		}

		if ( target !== home && !validFolders.includes( target ) ) {
			filter( validRoutes )
		}

	}
	getBrowser() {
		return navigator ? navigator.userAgent : "other";
	}



	scrollYSmooth({ from, to, duration, behavior }) {

		/*
		 * Scroll from initY to 0
		 * @param { number } initY - initial scroll Y
		 * @param { number } duration - transition duration
		 * @param { string } timingName - timing function name. Can be one of linear, ease-in, ease-out, ease-in-out
		 */

		const TIMINGFUNC_MAP = {
			"linear": t => t,
			"ease-in": t => t * t,
			"ease-out": t => t * (2 - t),
			"ease-in-out": t => (t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
		}
		const timingFunc = TIMINGFUNC_MAP[ behavior ]

		let start = null

		const step = (timestamp) => {

			start = start || timestamp
			const progress = timestamp - start
			// Growing from 0 to 1
			const time = Math.min(1, ((timestamp - start) / duration))
			const distance = Math.abs(from - to)
			const target = timingFunc(time) * distance
			const movement = from > to ? from - target : from + target

			window.scrollTo(0, movement)

			if (progress < duration) {
				window.requestAnimationFrame(step)
			}
		}

		window.requestAnimationFrame(step)

	}
	scrollToTop() {
		const storedHeight = this.state.windowHeight ? this.state.windowHeight : window.innerHeight
		this.scrollYSmooth({ from: storedHeight, to: 0, duration: 700, behavior: "ease-in-out" });
		//		window.scroll( { left: 0, top: 0, behavior: "smooth" } )		
	}
	heroStatus() {
		// TODO: place lo-res image first, then change it to hi-res
		//		if ( i > 0 ) {
		this.setState({
			heroDidLoad: true,
			//				hero: helpers.getFullPath( imagesPath, "hero", "Kaltblut-09.jpg" )
		})
		//		}	
	}







	// handlers
	// handleViewHeight() {

	// 	const vh = window.innerHeight;
	// 	document.documentElement.style.setProperty("--vh", `${vh}px`);

	// 	const storedHeight = this.state.windowHeight ? this.state.windowHeight : vh

	// 	if (vh !== storedHeight) {
	// 		this.setState({
	// 			windowHeight: vh
	// 		})
	// 	}

	// }
	handleResize() {
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		console.log( "vw", vw )
		console.log( "vh", vh )

		// set css var
		document.documentElement.style.setProperty("--vh", `${vh}px`);

		const storedWidth = this.state.windowWidth ? this.state.windowHWidth : vw
		const storedHeight = this.state.windowHeight ? this.state.windowHeight : vh

		if ( vw !== storedWidth || vh !== storedHeight ) {
			this.setState({
				windowWidth: vw,
				windowHeight: vh
			})
		}
	}
	handleScroll(e) {

		// let previousScrollPosition = this.state.scrollPosition
		// const scrollPosition = window.scrollY
		// const windowHeight = window.innerHeight
		// const heroViewHeight = windowHeight - 100

		// const scrollingDown = previousScrollPosition < scrollPosition ?
		// 	true : false

		// const heroIsVisible = scrollPosition < heroViewHeight ?
		// 	true : false

		// this.setState({
		// 	scrollPosition: scrollPosition,
		// 	scrollingDown: scrollingDown,
		// 	heroIsVisible: heroIsVisible
		// })
	}
	heroScroll() {

		const storedHeight = this.state.windowHeight ? this.state.windowHeight : window.innerHeight
		this.scrollYSmooth({ from: window.scrollY, to: storedHeight, duration: 700, behavior: "ease-in-out" });
	}
	handleHero(heroIsActive) {
		// console.log("handleHero", heroIsActive)		
		this.setState({
			heroIsActive: heroIsActive
		})
	}
	handleClick(i) {

		if (i === "/" || i === "heroClick") {
			if (i === "/") {
				this.scrollToTop()
			}
			if (i === "heroClick") {
				this.heroScroll()
			}
		} else {
			if (this.state.heroIsActive) {
				this.handleHero(false)
			}
		}

	}
	handleLocation(pathname) {

		let newPath

		if (pathname === "/") {

			newPath = pathname

		} else {

			const splitPath = pathname.split("/")

			if (splitPath.length > 0) {
				if (splitPath[0] === "") {

					splitPath.shift()
				}
				if (splitPath[0] === "showcase" && splitPath.length > 1 && splitPath[1] !== "") {
					newPath = splitPath[1]
				} else {
					newPath = splitPath[0]
				}
			}

		}

		return newPath

	}

	// TODO: do i need this?
	validateShowcase(target) {

		if (target !== null && this.state.backendConnected) {

			const validShowcases = this.state.showcases.map((showcase) => (
				showcase.folder
			))

			return validShowcases.includes(target) ? true : false

		} else {

			return false

		}

	}

	goTo( target ) {
		window.location.replace( target )
		//		window.history.pushState( { target: target }, "target", target );
	}

	render() {

		// is showcases data available?
		const showcasesAvailable = this.state.showcases.length > 0 ? true : false
		const targetLocation = this.state.targetLocation

		const state = this.state

		const validRoutes = this.state.validRoutes

		// TODO: do i need this?
		const heroDidLoad = this.state.heroDidLoad
		const heroIsActive = this.state.heroIsActive
		const activateHero = ( i ) => this.handleHero( i )
		const heroIsVisible = this.state.heroIsVisible
		
		// TODO: do i need this?
		const oneUp = this.oneUp

		const onClick = this.onClick



		// TODO: do i need this?
		const mainClass = "appear " +
			( heroDidLoad ? "freedom-below" : "" )

		const headerTag = (
			<Header
				state = { state }
				onClick = { onClick }
				heroIsActive = { heroIsActive }
				headerId = "1"
			/>
		)

		const footerTag = (
			<Footer
				state = { state }
				onClick = { onClick }
			/>
		)

		const home = targetLocation === validRoutes.home ? true : false

		return (

			<div>

				{ heroDidLoad || !home ? headerTag : null }

				<Switch>

					<Route
						exact
						path = { validRoutes.home }
						render = { props => (

							<HomeRoute
								{ ...props }
								state = { state }
								showcasesAvailable = { showcasesAvailable }
								onClick = { onClick }
								mainClass = { mainClass }
								activateHero = { activateHero }
								heroIsVisible = { heroIsVisible }
								heroDidLoad = { heroDidLoad }
								oneUp = { oneUp }
							/>

						) }
					/>

					<Route
						exact
						path = { validRoutes.showcase }
						render = { props => (

							<ShowcaseRoute
								{ ...props }
								state = { state }
								mainClass = { mainClass }
								onClick = { onClick }
								activateHero = { activateHero }
								goHome = { () => this.goHome() }
								showcasesAvailable = { showcasesAvailable }
								headerId = "2"
							/>

						) }
					/>

					<Route
						path = { validRoutes.contact }
						render = { props => (

							<ContactRoute
								{ ...props }
								state = { state }
								mainClass = { mainClass }
								activateHero = { activateHero }
							/>

						) }
					/>

					<Route
						path = { validRoutes.imprint }
						render = { props => (

							<ImprintRoute
								{ ...props }
								state = { state }
								mainClass = { mainClass }
								activateHero = { activateHero }
							/>

						) }
					/>

					<Route
						path = { validRoutes.privacy }
						render = { props => (

							<PrivacyRoute
								{ ...props }
								state = { state }
								mainClass = { mainClass }
								activateHero = { activateHero }
							/>

						)}
					/>

				</Switch>

				{ heroDidLoad || !home ? footerTag : null }

			</div>

		)

	}

}

export default App
