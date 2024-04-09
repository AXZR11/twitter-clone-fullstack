import formidable from "formidable"
import { tweetTransformer } from "~/server/transformers/tweet.js"
import { createTweet } from "../../../db/tweets.js"

export default defineEventHandler(async (event) => {

    const form = formidable({})

    const response = await new Promise((resolve, reject) => {
        form.parse(event.req, (err, fields, files) => {
            if(err) {
                reject(err)
            }
            resolve({fields, files})
        })
    })

    const {fields, files} = response

    const userId = event.context?.auth?.user?.id

    const tweetData = {
        text: fields.text,
        authorId: userId
    }

    const tweet = await createTweet(tweetData)

    return {
        tweet: tweetTransformer(tweet)
    }
})