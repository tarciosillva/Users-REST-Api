import { userStub } from "../stubs/user.stub"

export const UsersService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(userStub),
    phoneValidation: jest.fn().mockResolvedValue([userStub]),
    cpfValidation: jest.fn().mockResolvedValue(userStub),
    findAll: jest.fn().mockResolvedValue(userStub),
    findOne: jest.fn().mockResolvedValue(userStub),
    update: jest.fn().mockResolvedValue(userStub),
    remove: jest.fn().mockResolvedValue(userStub),
})