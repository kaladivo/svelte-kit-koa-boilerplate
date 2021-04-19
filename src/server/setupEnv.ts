/* eslint-disable */
import dotenv from 'dotenv'

const result = dotenv.config({
	path: `.env`,
})

if (result.error) {
	throw result.error
}
