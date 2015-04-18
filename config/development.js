module.exports = {
	http : {
		port : 8080,
		respondWith : 'html',
		statics : 'app/public/',
		session : {
			secret : 'L&>${?;f2b|4}!U^|QIP'
		},
		logger : 'HTTP :remote-addr :method :url :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
	},

	cluster: {
		enabled: false,
		cpus: 'all', /* all or cpu-count as integer */
		restart: false
	},

	socket: {
		hostname: '',
		port: 9002,
		ssl: {
			enabled: false,
			cert: '',
			key: ''
		}
	},

	redis : {
		port: null,
		host: null,
		config: null
	},

	logger : {
		levels : {
			console : 0,
			file : 1
		}
	},

	waterline: {
		connections: {
			mysql: {
			  adapter: 'mysql',
			  host: 'localhost',
			  database: '',
			  user: '',
			  password: ''
			},
			redis: {
				adapter: 'redis',
				port: 6379,
				host: 'localhost',
				password: null,
				database: null
			}
		},
		defaults: {
			migrate: 'alter'
		}
	},


	mailer: {
		smtp: true,

		transport : {
			host : '',
			ssl : true,
			port : 587,
			auth : {
				user : '',
				pass : ''
			}
		},
		templates : '../views/mail',
		mailOptions : {
			from : 'My Name <name@dot.com>'
		},

		sendgrid:{
			enabled: false,
			auth: {
				api_user: '',
    			api_key: ''
  			}
		}
	},

	job: {
		port: 3002,
		enabled: true
	}

};
