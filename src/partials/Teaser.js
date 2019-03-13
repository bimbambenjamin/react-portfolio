import React from 'react'
import { NavLink } from 'react-router-dom'

import LoadElement from '../handler/LoadElement'



class Teaser extends React.Component {

	constructor( props ) {
		super( props )

		// TODO: do i need state?
		// to keep it dynamic …
		// className could be passed down from parent into state 
		this.state = {
			flag: "teaser",
			headerStyle: "one-word-per-line",
			hover: "teaser-hover"
		}

		this.ref = React.createRef()
	}

	onMouseEnter( i ) {
		const className = this.ref.current.className
		this.ref.current.className = `${ className } ${ this.state.hover }`
	}
	onMouseLeave( i ) {
		const className = this.ref.current.className.replace( this.state.hover, "" )
		this.ref.current.className = className.trim()
	}
	scrollToTop() {
		// TODO: change to smooth scroll
		window.scroll( { top: 0 } )
	}

	render() {

		const flag = this.state.flag

		const props = {
			flag: flag,
			loaded: this.props.loaded,
			preloaderSrc: this.props.preloader,
			className: `${ flag }-element`,
			element: this.props.element,
			count: this.props.count,
			oneUp: this.props.oneUp,
			windowWidth: this.props.windowWidth,
			windowHeight: this.props.windowHeight,
		}

		return (
			<div
				className = { `${ flag } ${ this.state.headerStyle }` }
				ref = { this.ref }
				onMouseEnter = { () => this.onMouseEnter() }
				onMouseLeave = { () => this.onMouseLeave() }
			>

				<NavLink 
					onClick = { this.scrollToTop }
					to = { this.props.linkTo }
				>
					<LoadElement { ...props }/>
					<span className = { `${ flag }-title` }>{ props.element.title }</span>
				</NavLink>

			</div>
		)
	}

}

export default Teaser
