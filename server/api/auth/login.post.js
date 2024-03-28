import { getUserByUsername } from "../../db/users.js"
import bcrypt from "bcrypt"
import { generateTokens } from "../../utils/jwt.js"
import { userTransformer } from "~~/server/transformers/user.js"
import { createRefreshToken } from "../../db/refreshTokens.js"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { username, password } = body

    if(!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    // Is the user registered
    const user = await getUserByUsername(username)

    if(!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    // Compare passwords
    const doesThePasswordMatch = await bcrypt.compare(password, 
        user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }
    // Generate Tokens
    // Access token
    // Refresh token
    const { accessToken, refreshToken } = generateTokens(user)

    // Save it inside db
    await createRefreshToken ({
        token: refreshToken,
        userId: user.id
    })

    // add http only cookie

    return {
        accessToken: accessToken, user: userTransformer(user)
    }
})