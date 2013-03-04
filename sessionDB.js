function login(req, username) {
	req.session.username = username;
}

exports.login = login