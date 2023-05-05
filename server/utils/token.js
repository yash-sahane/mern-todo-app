// import jwt from "jsonwebtoken";

// export const createCookie = (user, req, res, statusCode, message) => {
//     const token = jwt.sign({ id: user._id }, 'secret');
//     console.log('generated token', token);

//     // const domain = req.hostname.endsWith('localhost') ? 'localhost' : '.onrender.com';
//     const domain = 'node-todoapp.y4t1.onrender.com';

//     // 6. if success then send create success message with creating cookie for login
//     res.status(statusCode).cookie("token", token, {
//         httpOnly: true,
//         maxAge: 1000 * 180 * 15,
//         sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
//         secure: process.env.NODE_ENV === 'Production',
//         domain: domain
//         // domain: 'onrender.com'
//     }).json({
//         success: true,
//         message: message
//     })
// }






import jwt from "jsonwebtoken";

export const createCookie = (user, req, res, statusCode, message) => {
    const token = jwt.sign({ id: user._id }, 'secret');
    console.log('generated token', token);

    // const domain = req.hostname.endsWith('localhost') ? 'localhost' : '.onrender.com';
    // const domain = 'node-todoapp.y4t1.onrender.com';

    // 6. if success then send create success message with creating cookie for login
    res.status(statusCode).json({
        success: true,
        token : token,
        message: message
    })
}