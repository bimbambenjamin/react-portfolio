import React from 'react'
import ReactDOM from 'react-dom'



class BackgroundSize extends React.Component {

	constructor( props ) {

		super( props )

		this.state = {
			height: 0,
			width: 0
		}

	}

	componentDidMount() {

		const height = this.divElement.clientHeight
		const width = this.divElement.clientWidth

		this.setState( { 
			height, 
			width 
		} )

	}

	render() {

		return (
			console.log( "divHeight: ", this.state.height, " / divWidth: ", this.state.width )
		)

	}
	
}

export default BackgroundSize
