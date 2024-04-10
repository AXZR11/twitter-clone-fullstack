import { prisma } from ".";

const createMediaFile = (mediaFile) => {
    return prisma.mediaFile.create({
        data: mediaFile
    })
}