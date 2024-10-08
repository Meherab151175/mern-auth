import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

export const updateUser = async (req,res,next) =>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(403,"You can update only your account!"))
    }
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 12)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            },
            {new: true}
        )
        const {password, ...others} = updatedUser._doc
        res.status(200).json(others)
    } catch (error) {
        next(error)
    }
};



export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can delete only your account!'));
    }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted...');
    } catch (error) {
      next(error);
    }
  
  }