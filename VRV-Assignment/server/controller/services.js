import express from 'express'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/cctv', auth, (req, res) => {
    const validRoles = ['Gaurd', 'Manager', 'Authority'];
    if (validRoles.includes(req.role))
        return res.status(200).json({ message: `✅OK as ${req.role} a you are authorized to access CCTV.` });
    return res.status(401).json({ message: `❌OPSS as a ${req.role} you are not authorized for this.` });

})

router.get('/gdeployed', auth, (req, res) => {
    const validRoles = ['Manager', 'Authority'];
    if (validRoles.includes(req.role))
        return res.status(200).json({ message: `✅OK as a ${req.role} you can see all deployements.` });

    return res.status(401).json({ message: `❌OPSS as a ${req.role} you are not authorized for this.` });
})

router.get('/attendence', auth, (req, res) => {
    const validRoles = ['Manager', 'Authority'];
    if (validRoles.includes(req.role))
        return res.status(200).json({ message: `✅OK as a ${req.role} you can check attendence.` });

    return res.status(401).json({ message: `❌OPSS as a ${req.role} you are not authorized for this.` });
})

router.get('/activeunits', auth, (req, res) => {
    const validRoles = ['Authority'];
    if (validRoles.includes(req.role))
        return res.status(200).json({ message: `✅OK as a ${req.role} you can check acive units.` });

    return res.status(401).json({ message: `❌OPSS as a ${req.role} you are not authorized for this.` });
})

export default router;