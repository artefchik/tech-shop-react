const { ObjectId } = require('mongodb');
const ApiError = require('../exceptions/apiError');
const ProfileModel = require('../models/profileModel');
const UserService = require('./userService');
const ProfileDto = require('../dtos/profileDto');
const UserDto = require('../dtos/userDto');

const UserModel = require('../models/userModel');

class ProfileService {
    async getById(userId) {
        const profile = await ProfileModel.findById(userId);
        if (!profile) {
            return ApiError.BadRequest(`Пользователь не найден.`);
        }
        const profileDto = new ProfileDto(profile);
        const user = await UserModel.findById(userId);
        const userDto = new UserDto(user);
        return { ...profileDto, user: userDto };
    }

    async createProfile(id) {
        const profile = await ProfileModel.create({ _id: new ObjectId(id) });
        return profile;
    }

    async updateProfile(data, id) {
        console.log(data);
        const updatedProfile = await ProfileModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );
        const profileDto = new ProfileDto(updatedProfile);
        const user = await UserModel.findById(profileDto.id);
        const userDto = new UserDto(user);
        return { ...profileDto, user: userDto };
    }
}

module.exports = new ProfileService();
