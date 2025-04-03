const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = 3040

app.use(cors())
app.use(express.json())

const SECRET_KEY = 'qwer'

const dummyUser = {
    username: 'user1',
    password: '1234'
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body
	console.log(req.body)
    if (username === dummyUser.username && password === dummyUser.password) {
		const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: 360 })
		res.json({ token })
        //res.json({ success: true, username })
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
})

// 인증이 필요한 경우 사용되는 라우터
app.get('/api/protected', (req,res) => {
	console.log("protected router")
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	
	if(!token) return res.status(401).json({ message: 'No Token provided' })
	console.log(token)
	jwt.verify(token, SECRET_KEY, (err,user) => {
		if (err) return res.status(403).json({message: 'Invalid token'})
		res.json({ message: `Hello, ${user.username}` })
	})

})

app.listen(PORT, () => {
    console.log('Server is running')
})