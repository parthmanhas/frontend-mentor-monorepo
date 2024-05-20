import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()


function generateUsers(count: number, tags: { id: string; name: string; }[]) {
    let users = [];
    for (let i = 0; i < count; i++) {
        const email = faker.internet.email();
        let user = {
            email,
            username: faker.internet.userName(),
            name: faker.person.fullName(),
            feedbacks: [...generateFeedbacks(5, email, tags)]
        }
        users.push(user);
    }
    return users;
}

function generateFeedbacks(count: number, userEmail: string, tags: { id: string; name: string; }[]) {
    let feedbacks = [];
    for (let i = 0; i < count; i++) {
        let feedback = {
            id: faker.string.uuid(),
            heading: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            tags: tags.splice(Math.floor(Math.random() * tags.length), Math.floor(Math.random() * 10)),
            upvotes: faker.number.int(100),
            userEmail
        }
        feedbacks.push(feedback);
    }
    return feedbacks
}

function generateTags(count: number) {
    let tags = [];
    for (let i = 0; i < count; i++) {
        let tag = {
            id: faker.string.uuid(),
            name: faker.lorem.word()
        }
        tags.push(tag);
    }
    return tags;
}

async function main() {

    await prisma.user.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.feedback.deleteMany();

    const tags = generateTags(20);

    // await prisma.tag.createMany({
    //     data: tags
    // })

    const users = generateUsers(30, tags);

    for (const user of users) {
        await prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                name: user.name,
                feedbacks: {
                    create: user.feedbacks.map(feedback => ({
                        id: feedback.id,
                        heading: feedback.heading,
                        content: feedback.content,
                        upvotes: feedback.upvotes,
                        tags: {
                            create: feedback.tags
                        }
                    }))
                }
            }
        })
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })