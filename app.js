var express = require('express'),
    bodyParser = require('body-parser'), 
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoose = require('./libs/mongoose'),
    user = require('./models/user'),
    app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', 'views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
	extended: true
    }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    secret: 'Keyboard Dog',
    name: 'sid',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname + '/public'));

//
app.post('/login', function(req, res, next) {
    user.findOne({login: req.body.login}, function(err, data) {

	if (err) {
	    return next(err);
	}

	if (data && data.checkPassword(req.body.password)) {
	    req.session.user = data._id;
	    req.session.username = data.name;
	    res.redirect('/');
	} else {
	    return next(err);
	}
    });
});

app.post('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

app.get('/register', function(req, res, next) {
    res.render('register');
});

app.post('/newuser', function(req, res, next) {

    var user = new mongoose.models.User(req.body);

    user.save(function(err) {
	if (err) {
	    console.log(err);
	    // TODO Выводить userfrendly код ошибки
	    res.render('regerror', {});
	} else {
	    req.session.user = user._id;
	    req.session.username = user.name;
	    res.redirect('/');
	}
    });
});

// Check autorization
app.use(function(req, res, next) {
    if (!req.session.user) {
	res.render('auth');
    } else {
	next();
    }
});


// Get the index
app.get('/', function(req, res, next) {
    res.render('index', {
	username: req.session.username
    });
});

// Get one user data
app.get('/user/:id', function(req, res, next) {
    user.findOne(req.params, function(err, data) {
	if (err) {
	    next(err);
	} else {
	    res.send(data);
	}
    });
});

// Get users list
app.get('/users', function(req, res, next) {
    user.find(function(err, data) {
	if (err) {
	    next(err);
	} else {
	    res.send(data);
	}
    });
});

// Save a new user
app.post('/user', function(req, res, next) {

    var user = new mongoose.models.User(req.body);

    user.save(function(err) {
	if (err) {
	    next(err);
	} else {
	    res.render('index');
	}
    });
});

// Update or drop existing user
app.post('/user/:id', function(req, res, next) {

    if (req.body.name == undefined) {   // empty request - drop user

	user.findOneAndRemove({
	    'id': req.params.id
	},
	function(err) {
	    if (err) {
		next(err);
	    } else {
		res.send('ok');
	    }
	});

    } else {	// update user
	
	var set = {
	    name: req.body.name,
	    login: req.body.login
	};

	if (req.body.password) {
	    var salt = Math.random() + '';
	    set.hashedPassword = user.encryptPassword(req.body.password, salt);
	    set.salt = salt;
	}

	user.update({
	    'id': req.params.id
	}, 
	{
	    $set: set
	}, 
	function(err) {
	    if (err) {
		next(err);
	    } else {
		res.send('ok');
	    }
	});
    }
});

// Обработка ошибок
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).end();
});

app.listen(app.get('port'), 
	function() {
	    console.log('QSTest application listening on port: ' + app.get('port'));
	}
);
