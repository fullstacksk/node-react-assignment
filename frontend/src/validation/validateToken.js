import jwt from 'jsonwebtoken';


export default  (token) => {
    const decodedToken = jwt.verify(token, 'boxLive');
    return decodedToken;
}
