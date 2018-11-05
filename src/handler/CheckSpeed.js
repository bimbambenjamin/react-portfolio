
function InitiateSpeedDetection( src ) {
		
	MeasureConnectionSpeed( src )
	
	return ShowProgressMessage( "checking connection speed" )

}

function MeasureConnectionSpeed( src ) {

	// TODO: get size from src
	const size = 1851612  //bytes

	let endTime
	const startTime = new Date().getTime()
	const cacheBuster = "?nnn=" + startTime
	const download = new Image()

	download.onload = () => {

		endTime = new Date().getTime()

		const bitsLoaded = size * 8
		const duration = ( endTime - startTime ) / 1000
		const result = bitsLoaded / duration

		console.log( GetBps( result ) )

	}

	download.onerror = ( err, message ) => {
		ShowProgressMessage( "invalid / error" )
	}

	download.src = src + cacheBuster
	
	return "you whore!"

}

function GetBps( result ) {

	let speedBps = result.toFixed( 2 )
	let speedKbps = ( speedBps / 1024 ).toFixed( 2 )
	let speedMbps = ( speedKbps / 1024 ).toFixed( 2 )

	return ShowProgressMessage( [

		"Your connection speed is: ", 
		speedBps + " bps", 
		speedKbps + " kbps", 
		speedMbps + " Mbps"

	] )
	
}

function ShowProgressMessage( text ) {
	
	let message

	if ( typeof text === "string" ) {
		message = text
	} else {
		for ( let i = 0; i < text.length; i++ ) {
			message = text[ i ]
		}
	}

//	console.log( "FN ShowProgressMessage ", message )

	return message

}

export function CheckSpeed( src ) {
	
	return InitiateSpeedDetection( src )
	
}

export default CheckSpeed
