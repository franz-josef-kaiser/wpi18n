# wpl18n

A dynamic composer package building server to fetch WordPress plugin and 
theme translation from the official [w.org](http://w.org] repositories.

## Local Development

To test the Nodejs server, you might want to use _[ngrok](https://ngrok.com/download)_. 
There are quick install bash scripts in the `.bin`-directory. Just call 
`sh .bin/ngrok{os}` to download and extract _ngrok_ and remove the archive.

Then you can run the local _Nodejs_ server

    npm run dev

and start tunneling traffic to it

	# Run server
	ngrok http 5000

	# Or use a custom local IP address or domain 
	ngrok http -host-header=0.0.0.0 5000
	ngrok http -host-header=wpl18n.dev 5000

By now, the terminal should have changed and _ngrok_ should present you with 
a unique URl, exposing your local _Nodejs_ server to the public.