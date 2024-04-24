import express from 'express'
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifytoken.js';


const router = express.Router()



// UPDTAE
router.put("/:id", verifyUser, updateUser)
// DELETE

router.delete("/:id", verifyUser ,deleteUser)
//GET

router.get("/:id", verifyUser, getUser)
//GETALL

router.get("/", verifyAdmin, getUsers)


export default router;