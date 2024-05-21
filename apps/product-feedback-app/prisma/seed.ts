import { PrismaClient, Status } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

function generateCategories(count: number) {
    let categories = [];
    for (let i = 0; i < count; i++) {
        const category = {
            name: faker.lorem.word()
        }
        categories.push(category);
    }
    return categories;
}


function generateUsers(count: number, tags: { id: string; name: string; }[], categories: { name: string }[]) {
    let users = [];
    for (let i = 0; i < count; i++) {
        const email = faker.internet.email();
        let user = {
            email,
            username: faker.internet.userName(),
            name: faker.person.fullName(),
            feedbacks: [...generateFeedbacks(5, email, tags, categories)]
        }
        users.push(user);
    }
    return users;
}

function generateFeedbacks(count: number, userEmail: string, tags: { id: string; name: string; }[], categories: { name: string }[]) {
    let feedbacks = [];
    for (let i = 0; i < count; i++) {
        let feedback = {
            heading: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            tags: tags.splice(Math.floor(Math.random() * tags.length), Math.floor(Math.random() * 10)),
            upvotes: faker.number.int(100),
            userEmail,
            status: ['PLANNED', 'INPROGRESS', 'LIVE'][Math.floor(Math.random() * 3)],
            category: categories[Math.floor(Math.random() * 5)]
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
    await prisma.category.deleteMany();

    const tags = generateTags(20);
    const categories = generateCategories(5);

    // await prisma.tag.createMany({
    //     data: tags
    // })

    const users = generateUsers(30, tags, categories);

    for (const user of users) {
        await prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                name: user.name,
                feedbacks: {
                    create: user.feedbacks.map(feedback => ({
                        heading: feedback.heading,
                        content: feedback.content,
                        upvotes: feedback.upvotes,
                        status: feedback.status as Status,
                        category: {
                            create: {
                                name: feedback.category.name
                            }
                        },
                        tags: {
                            create: feedback.tags
                        },
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