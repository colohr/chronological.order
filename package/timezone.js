const fxy = require('fxy')
const {URL} = require('url')
const http = require('https')
const query = require('querystring')
const locator = require('./api').endpoint
const timezone = get_timezone_api()

//exports
module.exports = get_timezone

//shared actions
function get_data(url){
	let data = ''
	return new Promise((success,error)=>{
		return process.nextTick(()=>{
			return http.get( url, response=>{
				const status = response.statusCode
				const type = response.headers['content-type']
				if(status !== 200) return error(new Error(`Request Failed.\n Status Code: ${status}`))
				else if(!/^application\/json/.test(type)) return error(new Error(`Invalid content-type.\n Expected application/json but received ${type}`))
				response.resume()
				response.setEncoding('utf8')
				response.on('data', chunk => data += chunk )
				response.on('end', on_end)
			}).on('error', on_error)
		})
		//shared actions
		function on_end(){
			try{ return success(JSON.parse(data)) }
			catch(e) { return error(e) }
		}
		function on_error(e){ return error(e) }
	})
}

async function get_location_tuple(input){
	if(fxy.is.text(input.location)) return input.location
	else if(fxy.is.array(input.location) && input.location.length === 2) return input.location.join(',')
	let xy = null
	if(fxy.is.data(input.coordinates)) xy = await input.coordinates
	else if(fxy.is.data(input.location)) xy = input.location
	else if('latitude' in input && 'longitude' in input) xy = input
	if(xy && 'latitude' in xy && 'longitude' in xy) return [xy.latitude,xy.longitude].join(',')
	return null
}

function get_saved_timezone(input){
	if(!timezone.saves || !('saved' in timezone)) return null
	if('name' in input && timezone.saved.has(input.name)) return timezone.saved.get(input.name)
	return null
}

async function get_timezone(input,key){
	if(!fxy.is.data(input)) throw new Error(`ChronologicalOrder.timezone: Invalid timezone input.  Input must be a valid object/json data.`)
	if(fxy.is.text(key)) timezone.key = key
	if(!('key' in timezone)) throw new Error(`ChronologicalOrder.timezone: Missing Google Time Zone Api Key.`)
	const saved = get_saved_timezone(input)
	if(saved) return saved
	const url = await get_url(input)
	if(!url) throw new Error(`ChronologicalOrder.timezone: Missing location coordinates (longitude,latitude) in input.`)
	return get_data(url).then(response=>{
		return save_timezone({
			input,
			response,
			value:get_value(response)
		})
	})
}

function get_timezone_api(){
	const api = {}
	const preset = require('./api')
	api.saves = preset.saves
	const {key} = preset.parameters
	if(key) api.key = key
	return api
}

async function get_url(input){
	const url = new URL(locator)
	const data = {}
	if(fxy.is.number(input.timestamp)) data.timestamp = input.timestamp
	else data.timestamp = new Date().getTime() / 1000
	data.location = await get_location_tuple(input)
	if(!data.location) return null
	if('language' in input) data.language = input.language
	data.key = timezone.key
	url.search = query.stringify(data)
	return url
}

function get_value(response){
	const value = {}
	if(fxy.is.data(response)){
		for(const field in response){
			value[fxy.id.underscore(field)] = response[field]
		}
	}
	return value
}

function save_timezone(data){
	if(!timezone.saves) return data
	if('name' in data.input){
		if(!('saved' in timezone)) timezone.saved=new Map()
		timezone.saved.set(data.input.name,data)
	}
	return data
}
